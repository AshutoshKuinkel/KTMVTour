import tensorflow as tf
import numpy as np

model_path = "C:/Users/ashut/Desktop/KTMVTour/ml-model/models/exported-models/exported-models_20251001-154823.keras"
# Disable safe mode to allow lambda deserialization, i need this because my model has the lambda function to resolve the sequential valueError.
myModel = tf.keras.models.load_model(model_path, safe_mode=False)
print('Model loaded')

# Class names used in training (set in same order as dataset subfolders)
class_names = np.array([
    'boudha-stupa',  # adjust based on your dataset folders
    'dharahara',
    # ... add all your actual class folder names here in the same order they were loaded during training
])

img_path = "C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/boudha-stupa/000087.jpg"

# Step 1: Load and preprocess image like in training
img = tf.io.read_file(img_path)
img = tf.image.decode_jpeg(img, channels=3)  # decode JPEG to tensor
img = tf.image.resize(img, [224, 224])       # resize to match training size
img = img / 255.0                            # normalize to [0, 1] like Rescaling layer
img = tf.expand_dims(img, axis=0)           # make it batch of 1

# Step 2: Predict
predictions = myModel.predict(img)
predicted_class_idx = tf.argmax(predictions[0]).numpy()
predicted_class_name = class_names[predicted_class_idx]

print(f"Predicted class: {predicted_class_name}")