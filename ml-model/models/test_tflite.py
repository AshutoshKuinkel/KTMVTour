import tensorflow as tf
import numpy as np
from PIL import Image
import os

# === AUTOMATIC PATHS — NO NEED TO CHANGE ANYTHING BELOW ===
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # ml-model root
tflite_path = os.path.join(base_dir, "models/exported-tf-lite-model/model_PERFECT.tflite")           # your latest good one
dataset_dir = os.path.join(base_dir, "dataset")

# Pick ONE real photo from each class to test
test_images = {
    "boudha-stupa": os.path.join(dataset_dir, "boudha-stupa", os.listdir(os.path.join(dataset_dir, "boudha-stupa"))[0]),
    "dharahara":    os.path.join(dataset_dir, "dharahara",    os.listdir(os.path.join(dataset_dir, "dharahara"))[0]),
    "no-landmark":  os.path.join(dataset_dir, "no-landmark",  os.listdir(os.path.join(dataset_dir, "no-landmark"))[0]),
}

class_names = ["boudha-stupa", "dharahara", "no-landmark"]

# Load TFLite model once
interpreter = tf.lite.Interpreter(model_path=tflite_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()[0]
output_details = interpreter.get_output_details()[0]

print("TFLite model loaded. Testing one photo from each class...\n")
print("="*70)

for label, img_path in test_images.items():
    # Load and preprocess exactly like your React Native app
    img = Image.open(img_path).convert("RGB").resize((224, 224))
    img_array = np.array(img, dtype=np.float32)
    img_array = (img_array / 127.5) - 1.0                # [-1, 1]
    img_array = np.expand_dims(img_array, axis=0)

    # Run inference
    interpreter.set_tensor(input_details['index'], img_array)
    interpreter.invoke()
    logits = interpreter.get_tensor(output_details['index'])[0]

    pred_idx = np.argmax(logits)
    confidence = tf.nn.softmax(logits).numpy()[pred_idx]

    print(f"{os.path.basename(img_path):30} → Predicted: {class_names[pred_idx]:12} | Confidence: {confidence:.1%}")
    print(f"   Logits: [{logits[0]:.2f}, {logits[1]:.2f}, {logits[2]:.2f}]\n")

print("="*70)
print("IF YOU SEE HIGH CONFIDENCE ON THE CORRECT CLASS → YOUR MODEL IS PERFECT")
print("COPY model_PERFECT.tflite INTO YOUR REACT NATIVE APP NOW!")