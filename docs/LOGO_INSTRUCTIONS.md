# 📸 Add Your Logo Image

## Quick Instructions

To complete the logo setup, you need to save your circular logo image.

### Step 1: Save the Logo

1. Take the circular logo image you showed me (with "FUTURE OF INTERNATIONAL CLASSES" text and rays)
2. Save it as: **`logo.png`**
3. Place it in the **`public`** folder

### Step 2: Copy Command

From your project directory, run:

```bash
# Copy your logo image to the public folder
cp /path/to/your/logo-image.png public/logo.png
```

**Example**:
```bash
# If your logo is on Desktop
cp ~/Desktop/logo.png public/logo.png
```

---

## 📐 Logo Specifications

### File Requirements
- **File name**: `logo.png` (exactly)
- **Location**: `public/logo.png`
- **Format**: PNG (recommended for transparent background)
- **Size**: 200x200px or higher
- **Background**: Transparent or white

### Display Size
The logo will be displayed at:
- **Navbar**: 64px × 64px (h-16 w-16)
- **Footer**: 64px × 64px (h-16 w-16)

---

## 🎨 Current Layout

After adding your logo, the branding will look like:

### Navbar
```
┌─────────────────────────────────┐
│  [Your Logo]                    │
│  STEM Mentorship by Manu Pande  │
└─────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────┐
│  [Your Logo]                    │
│  STEM Mentorship by Manu Pande  │
│                                 │
│  Premium STEM tutoring...       │
└─────────────────────────────────┘
```

---

## ✅ Verify Setup

After adding the logo file:

1. **Check file exists**:
   ```bash
   ls -la public/logo.png
   ```
   
   Should show:
   ```
   -rw-r--r--  1 user  staff  [size] public/logo.png
   ```

2. **Refresh browser**: http://localhost:5173/

3. **Check navbar**: Logo should appear in top-left

4. **Check footer**: Logo should appear at bottom

---

## 🐛 Troubleshooting

### Logo Not Showing?

**Check 1: File location**
```bash
ls public/logo.png
```
Must be exactly in `public/` folder, not in subdirectory.

**Check 2: File name**
Must be exactly `logo.png` (lowercase, no spaces).

**Check 3: Browser cache**
Clear browser cache: Ctrl/Cmd + Shift + R

**Check 4: Server restart**
If needed, restart the dev server:
```bash
# Stop: Ctrl + C
# Start: npm run dev
```

---

## 🎯 What Changed

### Branding Structure

**Removed**:
- ❌ "Future of International Classes" text

**Kept**:
- ✅ Logo image (your circular badge)
- ✅ "STEM Mentorship by Manu Pande" tagline

### Why This Works Better

The circular logo already contains "FUTURE OF INTERNATIONAL CLASSES" text in the design, so displaying it again as text was redundant. Now you have:

1. **Visual**: The logo (with embedded text)
2. **Text**: Clear tagline identifying the service

This is cleaner and more professional! 🎓

---

## 📱 Responsive Behavior

### Desktop (1024px+)
- Logo: 64px × 64px
- Text next to logo
- Full width available

### Mobile (< 768px)
- Logo: 64px × 64px
- Text next to logo
- May wrap on very small screens

---

## 🎨 Customization

### Want bigger/smaller logo?

Edit `Navbar.tsx` and `Footer.tsx`, change:
```typescript
className="h-16 w-16"  // Change to h-12 w-12 (smaller) or h-20 w-20 (bigger)
```

Common sizes:
- `h-12 w-12` = 48px (smaller)
- `h-16 w-16` = 64px (current)
- `h-20 w-20` = 80px (bigger)

### Want different spacing?

Change the spacing between logo and text:
```typescript
className="flex items-center space-x-3"  // Change space-x-3 to space-x-4, space-x-2, etc.
```

---

## ✅ Final Checklist

- [ ] Logo image saved as `logo.png`
- [ ] File placed in `public/` folder
- [ ] File name is exactly `logo.png` (lowercase)
- [ ] Browser refreshed
- [ ] Logo visible in navbar
- [ ] Logo visible in footer
- [ ] Tagline visible and readable
- [ ] Copyright updated
- [ ] All pages show consistent branding

---

## 🎉 You're Done!

Once you add the `logo.png` file, your website will have:

✅ Professional circular logo  
✅ Clean tagline: "STEM Mentorship by Manu Pande"  
✅ No redundant text  
✅ Consistent branding across all pages  

The logo will be visible on every page of your website! 🚀

---

**Need help?** Let me know if you have any questions about adding the logo file.
