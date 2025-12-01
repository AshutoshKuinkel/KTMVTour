import jpeg from "jpeg-js";

export function decodeJpegToTensor(
  base64Image: string,
  width: number,
  height: number
): Float32Array {
  const binary = atob(base64Image);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  // Decode JPEG → raw RGBA pixels
  const decoded = jpeg.decode(bytes, { useTArray: true });

  // Flattened RGB tensor
  const rgbTensor = new Float32Array(width * height * 3); // just the RGB channels

  for (let i = 0, j = 0; i < decoded.data.length; i += 4, j += 3) {
    rgbTensor[j] = (decoded.data[i] / 255.0) * 2.0 - 1.0; // R
    rgbTensor[j + 1] = (decoded.data[i + 1] / 255.0) * 2.0 - 1.0; // G
    rgbTensor[j + 2] = (decoded.data[i + 2] / 255.0) * 2.0 - 1.0; // B
  }

  return rgbTensor; // plain Float32Array
}
