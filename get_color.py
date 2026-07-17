import io
from PIL import Image, ImageCms

def get_srgb_color(image_path):
    img = Image.open(image_path)
    if 'icc_profile' in img.info:
        icc = io.BytesIO(img.info['icc_profile'])
        src_profile = ImageCms.ImageCmsProfile(icc)
        dst_profile = ImageCms.createProfile('sRGB')
        img = ImageCms.profileToProfile(img, src_profile, dst_profile)
    
    # Get top-left pixel
    return img.getpixel((0, 0))

print(get_srgb_color('public/makiacevi/ezgif-frame-001.jpg'))
