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
img_path = "C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/boudha-stupa/000087.jpg"
img = tf.io.read_file(img_path)
img = tf.image.decode_jpeg(img, channels=3)  # Decode JPEG to tensor
img = tf.image.resize(img, [224, 224])       # Resize to match training size
img = img / 255.0                            # Normalize to [0, 1] like Rescaling layer
img = tf.expand_dims(img, axis=0)            # Add batch dimension

# Predict
predictions = myModel.predict(img)
predicted_class_idx = tf.argmax(predictions[0]).numpy()
predicted_class_name = class_names[predicted_class_idx]

print(f"Predicted class: {predicted_class_name}")