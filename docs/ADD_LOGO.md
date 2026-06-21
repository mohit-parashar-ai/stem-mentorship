# Add Logo Image

## 📋 Instructions

To complete the branding update, you need to add the logo image file.

### Step 1: Save the Logo Image

1. Save the circular logo image (the one you shared) as: **`logo.png`**
2. Place it in the **`public`** folder: 
   ```
   /Users/mohitparashar/Library/CloudStorage/OneDrive-TalentKloud/Desktop/manupande/public/logo.png
   ```

### Step 2: Recommended Image Specifications

- **Format**: PNG (with transparent background recommended)
- **Size**: 200x200 pixels minimum (will display at 48x48px on screen)
- **File name**: `logo.png` (exactly as shown)

### Quick Command

```bash
# From project root, copy your logo file:
cp /path/to/your/logo-image.png public/logo.png
```

---

## ✅ What Has Been Updated

### 1. Navbar (Top of every page)
```
[Logo Image] Future of International Classes
             STEM Mentorship by Manu Pande
```

### 2. Footer (Bottom of every page)
```
[Logo Image] Future of International Classes
             STEM Mentorship by Manu Pande
```

### 3. Copyright
```
© 2026 Future of International Classes - STEM Mentorship by Manu Pande
```

---

## 🎨 Current Branding Structure

**Brand Name**: Future of International Classes  
**Tagline**: STEM Mentorship by Manu Pande  
**Logo**: Circular badge with rays (Indian flag colors)

### Visual Hierarchy

```
┌─────────────────────────────────────┐
│  [LOGO]  FUTURE OF INTERNATIONAL    │
│           CLASSES                    │
│          STEM Mentorship by         │
│          Manu Pande                 │
└─────────────────────────────────────┘
```

---

## 🔍 Where the Logo Appears

After adding `public/logo.png`, the logo will appear:

✅ **Navbar** - Top left corner with brand name  
✅ **Footer** - Bottom section with brand name  
✅ **Every Page** - Consistent branding throughout  

---

## 📐 Logo Display Settings

The logo is configured to display at:
- **Size**: 48px × 48px (3rem × 3rem)
- **Styling**: `object-contain` (maintains aspect ratio)
- **Alt text**: "Future of International Classes"

---

## 🧪 Testing

After adding the logo file:

1. **Refresh your browser**: http://localhost:5173/
2. **Check navbar**: Logo should appear in top-left
3. **Scroll to footer**: Logo should appear in footer
4. **Navigate pages**: Logo should appear consistently

---

## 🐛 Troubleshooting

### Logo Not Showing?

**Check file location**:
```bash
ls -la public/logo.png
```

**Should output**:
```
-rw-r--r--  1 user  staff  [size] [date] public/logo.png
```

### Wrong File Name?

Make sure it's exactly: `logo.png` (lowercase, no spaces)

### Image Not Loading in Browser?

1. Clear browser cache (Ctrl/Cmd + Shift + R)
2. Check browser console for 404 errors
3. Verify file is actually in `public/` folder

---

## 🎨 Optional: Favicon Update

You can also update the browser tab icon (favicon):

```bash
# Copy logo as favicon too
cp public/logo.png public/favicon.png
```

Then update `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

---

## 📝 Files Modified

✅ `src/components/layout/Navbar.tsx` - Updated logo and branding  
✅ `src/components/layout/Footer.tsx` - Updated logo and branding  
⏳ `public/logo.png` - **YOU NEED TO ADD THIS FILE**

---

## ✅ Quick Checklist

- [ ] Save logo image as `logo.png`
- [ ] Place in `public/` folder
- [ ] Verify file exists: `ls public/logo.png`
- [ ] Refresh browser
- [ ] Check navbar - logo visible?
- [ ] Check footer - logo visible?
- [ ] Test on all pages

---

## 🎉 Once Complete

Your website will have:

✅ Professional branded logo  
✅ Consistent brand name across all pages  
✅ Clear tagline: "STEM Mentorship by Manu Pande"  
✅ Updated copyright notice  

The circular logo with "FUTURE OF INTERNATIONAL CLASSES" text will give your site a professional, educational look! 🎓

---

**Need help?** Just ask if you need assistance adding the image file.
