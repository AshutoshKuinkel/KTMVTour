import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

# Dynamic Keras import (same as in training)
version_fn = getattr(tf.keras, "version", None)
if version_fn and version_fn().startswith("3."):
    import tf_keras as keras
else:
    keras = tf.keras

# Path to the saved model
model_path = "C:/Users/ashut/Desktop/KTMVTour/ml-model/models/exported-models/exported-models_20251001-170534.keras"

# Load the model with custom objects to handle hub.KerasLayer
myModel = keras.models.load_model(
    model_path,
    custom_objects={'KerasLayer': hub.KerasLayer}
)
print('Model loaded')

# Class names used in training (set in same order as dataset subfolders)
class_names = np.array([
    'boudha-stupa',
    'dharahara',
    # ... add other class names if applicable
])

# Load and preprocess image
img_path = "C:/Users/ashut/Desktop/KTMVTour/IMG_5895.jpg"
img = tf.io.read_file(img_path)
img = tf.image.decode_jpeg(img, channels=3)  # Decode JPEG to tensor
img = tf.image.resize(img, [224, 224])       # Resize to match training size
img = img / 255.0                            # Normalize to [0, 1] like Rescaling layer
img = tf.expand_dims(img, axis=0)            # Add a batch dimension to the image tensor (shape: [height, width, channels] -> [1, height, width, channels])
# The model expects a batch of images, so this creates a single-item batch for prediction

# Predict
# Run the model to predict the class of the input image
# myModel is the loaded Keras model (from TensorFlow Hub, with hub.KerasLayer)
# predictions is a tensor of shape [1, num_classes] containing raw output scores (logits) for each class
predictions = myModel.predict(img)

# Find the index of the class with the highest score in the predictions
# tf.argmax selects the index of the maximum value along the class axis (axis 0 of predictions[0])
# .numpy() converts the TensorFlow tensor to a NumPy integer for indexing class_names
predicted_class_idx = tf.argmax(predictions[0]).numpy()

# Map the predicted class index to the corresponding class name
# class_names is a NumPy array (e.g., ['boudha-stupa', 'dharahara']) defined earlier
# The index from argmax corresponds to the position in class_names
predicted_class_name = class_names[predicted_class_idx]

# Print the predicted class name
# This outputs the predicted landmark (e.g., 'boudha-stupa' or 'dharahara')
# Note: If IMG_5895.jpg is a non-landmark (e.g., a face), it may still predict a landmark due to the model's current limitations
print(f"Predicted class: {predicted_class_name}")