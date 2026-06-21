# Add Profile Image

## 📸 Instructions

The About page has been updated to display a professional profile photo instead of the "MP" placeholder.

---

## Quick Steps

1. **Save the profile image** (the professional photo) as:
   ```
   public/manu-pande-profile.jpg
   ```

2. **That's it!** The About page will automatically display the image.

---

## Image Specifications

### Recommended
- **Format**: JPG or PNG
- **Size**: 800×800 pixels minimum
- **Aspect Ratio**: Square (1:1) or portrait
- **File size**: Under 500 KB (optimize if needed)
- **File name**: `manu-pande-profile.jpg`

### Current Display
- Shows on About page
- Rounded corners with shadow
- Full width in grid layout
- Professional presentation

---

## Command to Add Image

```bash
# Copy your profile image to public folder
cp /path/to/your/profile-photo.jpg public/manu-pande-profile.jpg
```

**Example**:
```bash
# If image is on Desktop
cp ~/Desktop/profile-photo.jpg public/manu-pande-profile.jpg
```

---

## What Changed

### Before
```
┌──────────────────────┐
│                      │
│        MP            │
│  Engineering Pro     │
│  STEM Educator       │
│                      │
└──────────────────────┘
```

### After
```
┌──────────────────────┐
│                      │
│   [Your Professional │
│    Photo Displayed]  │
│                      │
└──────────────────────┘
```

---

## Test It

After adding the image:

```bash
npm run dev
```

Open: **http://localhost:5173/about**

You should see:
- ✅ Your professional photo displayed
- ✅ Rounded corners with shadow
- ✅ Professional presentation
- ✅ Responsive on all devices

---

## Troubleshooting

### Image Not Showing?

**Check 1: File exists**
```bash
ls -lh public/manu-pande-profile.jpg
```

**Check 2: File name correct**
Must be exactly: `manu-pande-profile.jpg` (lowercase, with hyphens)

**Check 3: Clear browser cache**
Press: Ctrl/Cmd + Shift + R

**Check 4: Restart dev server**
```bash
# Stop: Ctrl + C
# Start: npm run dev
```

---

## Optional: Optimize Image

If your image is large (over 500 KB), optimize it:

1. Go to: [https://tinypng.com](https://tinypng.com)
2. Upload your profile photo
3. Download optimized version
4. Save as `public/manu-pande-profile.jpg`

---

## ✅ Summary

✅ **About page updated** - Now displays real photo  
✅ **Professional layout** - Rounded corners + shadow  
✅ **Ready for image** - Just add `manu-pande-profile.jpg`  
✅ **Build successful** - No errors  

---

**Add your profile image to complete the About page!** 📸
