import tensorflow as tf
import tensorflow_hub as hub
import os
import numpy as np

#~ Comments are all to help me make sure I understand what each part is doing.
#~Used tensor flow documentation to write out this page,
#~Link: https://www.tensorflow.org/tutorials/images/transfer_learning_with_hub
#~Doc for converting my model to tensorflow lite (for on device ml) (NEED FOR LATER!!!): https://ai.google.dev/edge/litert/models/convert

#pipleline : sequence of steps involved in preparing and feeding data to your model for training or evaluation,
#steps in pipeline:
#1) Data loading (Load images from disk)
#2) Data preprocessing (images get resized, normalised, etc.)
#3) Batching (split into bacthes instead of throwing all data to model @ once)
#4) Caching (Cache images memory for faster access.)
#5) Prefetching (Prefetch the next batch while the current one is being used)
#6) Shuffling(optional) (you can sometimes shuffle the dataset so model doesn’t learn any unintended patterns from the order of the data)
#7) Data output (feeding the batches to model for training)

#btw epoch is just one loop/pass around the dataset, it's the # of times ur model will learn from your data in training set.
#more epochs make ur model more accurate up to a point, if you go past that point it'll just make accuracy worse, especially on
#new unseen data. It's like doing ur junk volume in the gym.

# ^--------------------------------------------------------------------------------------

#routing to the ml model base directory first:
#os.path.abspath(__file__) is this file, and if we wrap it in the .dirname we route to models file,
#then wrapping it once again we get to ml-model file.
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#now we need to go and access the dataset folder which is inside the ml model folder:
dataset_dir = os.path.join(base_dir,"dataset")

# Checking to make sure its pointing to the dataset folder here:
# print(f'dataset dir:' + dataset_dir)

# ^--------------------------------------------------------------------------------------

batch_size = 16
img_height = 224
img_width = 224

#?importing our dataset here in this model using our image data from our landmarks using
#?tf.keras.utils.image_dataset_from_directory, which will generate a tf.data.Dataset for training.
#?train_ds is the data model learns from & val_ds is held-out data to evaluate the model’s performance during training.

train_ds = tf.keras.utils.image_dataset_from_directory(
  str(dataset_dir), #?path to our dataset folder
  validation_split=0.2, #?Reserve 20% of data for validation
  subset="training", #?Makes sure we are using training split
  seed=123, #?Ensures same shuffle every run
  image_size=(img_height,img_width), #?Resizing all pics
  batch_size=batch_size #?16 images per batch to take it easy on the computer
)

val_ds = tf.keras.utils.image_dataset_from_directory(
  str(dataset_dir), 
  validation_split=0.2, 
  subset="validation", #?Makes sure we are using validation split
  seed=123,
  image_size=(img_height,img_width),
  batch_size=batch_size
)

#? so tf.keras.utils.image_dataset_from_directory works like this:

#? 1)Look inside data_root (your dataset/ folder).

#? 2)Treat each subfolder name as a class label (boudha-stupa, dharahara, …).

#? 3)Read the images inside those folders.

#? 4)Resize each image to (img_height, img_width).

#? 5)Batch them into groups of batch_size.

#? 6)Shuffle and split them into training or validation depending on the arguments.

class_names = np.array(train_ds.class_names)
#print(class_names)
#Just outputted the class_names (names of my landmarks)

# ^--------------------------------------------------------------------------------------

#we also gotta scale/normalise the image now because of TensorFlow Hub's convention
#for image models is to expect float inputs in the [0, 1] range.
# So normalising helps model perform better/efficient because neural networks work better
# w consistent scale of inputs e.g [0,1].
# use the tf.keras.layers.Rescaling preprocessing layer to achieve this:
normalisation_layer = tf.keras.layers.Rescaling(1./255)
train_ds = train_ds.map(lambda x,y: (normalisation_layer(x),y))
val_ds = val_ds.map(lambda x,y: (normalisation_layer(x),y))

# ^--------------------------------------------------------------------------------------

#finish the input pipeline by using buffered prefetching with Dataset.prefetch, so you can yield the data from disk without I/O blocking issues.
#how it works:

#.cache() stores the dataset in memory after the first epoch, so that subsequent epochs can access the data much faster without having to reload it from disk.

#.prefetch() allows TensorFlow to load data asynchronously while the model is training, which helps avoid bottlenecks from I/O operations.
# to expand further it means that while the model is training on the current batch of data, the next batch is already being loaded in the background, minimizing idle time.

#AUTOTUNE constant allows TensorFlow to automatically decide the optimal buffer size based on your system's resources

#These are some of the most important tf.data methods you should use when loading data:
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.cache().prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

#make sure pipeline is working like a good boy here and each batch contains the expected data dimensions.
for image_batch, labels_batch in train_ds:
  # print(image_batch.shape)
  # print(labels_batch.shape)
  break

# ^--------------------------------------------------------------------------------------

#! TO DO: Use MobileNetV2 from TensorFlow Hub to train.

#importing specific version of pre-trained mobilenetv2 model designed to extract feature vectors (not for classification).
#If we try to train the whole mobilenet it'll take a whole lotta comp. resources. so we use model without the top classification layer.
mobilenet_v2 = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4"
feature_extractor_model = mobilenet_v2

feature_extractor_layer = hub.KerasLayer( #keraslayer makes sure you can load models directly using urls and use them here in ur keras workflow.
    feature_extractor_model, #calling our feature extractor model 
    input_shape=(img_height, img_width, 3), #image sizing + 3 for rgb color.
    trainable=False) 
#We're not training the whole thing from scratch, we're freezeing all that and just training the last layer from our dataset.
#Weights of mobilenet model stay same. Hence trainable = false and our training only affects new classifier layer.
#good vid from code basics to explain how this is working: https://www.youtube.com/watch?v=LsdxvjLWkIY

# ^--------------------------------------------------------------------------------------
#The feature extractor returns a 1280-long vector for each image
feature_batch = feature_extractor_layer(image_batch)
# print(feature_batch.shape)

# ^--------------------------------------------------------------------------------------

# in here we find the number of classes for classification based on the class names provided.
# This gives us the number of output neurons we need in our model's final layer.
num_classes = len(class_names)

# Keras Sequential API is a way to build your neural network by lining up layers in order, like a stack of Lego blocks.
# Each layer processes the output from the previous layer and passes its own output to the next layer:

model = tf.keras.Sequential([
  feature_extractor_layer, #we take our data (images) and extract userful features from them using model mobilenet that processes the input and learns patterns
  tf.keras.layers.Dense(num_classes)
  # Dense Layer: The output layer where the classification happens. It will output num_classes predictions.
  # Each neuron corresponds to a class (e.g num_class = 3 then 3 neurons), and the one with the highest output is the model's final prediction.
])

#using this to visualise our model:
model.summary()