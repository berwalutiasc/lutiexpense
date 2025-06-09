// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploads'); // Your unsigned upload preset

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dyamjcymu/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Upload failed with status:', response.status);
      console.error('Error details:', data);
      throw new Error(data.error?.message || 'Upload failed');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}; 