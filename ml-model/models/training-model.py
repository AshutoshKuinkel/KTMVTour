import tensorflow as tf
import tensorflow_hub as hub
import os

#~Used tensor flow documentation to write out this page,
#~Link: https://www.tensorflow.org/tutorials/images/transfer_learning_with_hub
#~ Comments are all to help me make sure I understand what each part is doing.

# ^--------------------------------------------------------------------------------------

#routing to the ml model base directory first:
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
  validation_split=0.2, # ?Reserve 20% of data for validation
  subset="training", #?Makes sure we are using training split
  seed=123, #?Ensures same shuffle every run
  image_size=(img_height,img_width), #?Resizing all pics
  batch_size=batch_size #?16 images per batch to take it easy on the computer
)

val_ds = tf.keras.utils.image_dataset_from_directory(
  str(dataset_dir), 
  validation_split=0.2, 
  subset="training", #?Makes sure we are using validation split
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

# ^--------------------------------------------------------------------------------------

#finish the input pipeline by using buffered prefetching with Dataset.prefetch, so you can yield the data from disk without I/O blocking issues.
#These are some of the most important tf.data methods you should use when loading data:
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.cache().prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# ^--------------------------------------------------------------------------------------

#! TO DO: Use MobileNetV2 from TensorFlow Hub to train.