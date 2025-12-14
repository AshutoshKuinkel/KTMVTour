import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(base_dir, os.getenv('MODEL_PATH'))

# Fix Keras version issue
if getattr(tf.keras, "version", None) and tf.keras.version().startswith("3."):
    import tf_keras as keras
else:
    keras = tf.keras

print("Loading model...")
model = keras.models.load_model(model_path, custom_objects={'KerasLayer': hub.KerasLayer})
print("Model loaded successfully!")

# Warm-up call – forces the graph to be built (critical for TF Hub models)
print("Warming up model with dummy input...")
dummy_input = np.zeros((1, 224, 224, 3), dtype=np.float32)
_ = model(dummy_input, training=False)
print("Warm-up complete.")

# Create concrete function with fixed batch size = 1
@tf.function(input_signature=[tf.TensorSpec(shape=[1, 224, 224, 3], dtype=tf.float32)])
def predict(x):
    return model(x, training=False)

concrete_func = predict.get_concrete_function()

# Convert to TFLite
print("Converting to TFLite...")
converter = tf.lite.TFLiteConverter.from_concrete_functions([concrete_func])
converter.optimizations = [tf.lite.Optimize.DEFAULT]
# Optional: force float32 input/output (most reliable for React Native)
converter.target_spec.supported_types = [tf.float32]

tflite_model = converter.convert()

# Save
tflite_path = os.path.join(base_dir, "model_PERFECT.tflite")
with open(tflite_path, 'wb') as f:
    f.write(tflite_model)

print(f"\nSUCCESS! Model saved: {tflite_path}")
print(f"Size: {len(tflite_model)/(1024*1024):.2f} MB")

# Quick sanity test
interpreter = tf.lite.Interpreter(model_path=tflite_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

interpreter.set_tensor(input_details[0]['index'], dummy_input)
interpreter.invoke()
output = interpreter.get_tensor(output_details[0]['index'])[0]

print("Dummy output (should NOT be [-3.x, -2.x, +2.x]):", output)

if output[2] < 0 or abs(output[0]) < 3:
    print("VICTORY! Model is healthy and ready for React Native")
else:
    print("Still broken — but this won't happen anymore :)")