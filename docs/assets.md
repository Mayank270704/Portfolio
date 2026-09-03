# Static assets

Files here are served from the site root: `public/images/photo.jpg` is `/images/photo.jpg`.

| Folder | What goes in it |
| --- | --- |
| `images/` | Professional photograph, shared illustrations |
| `projects/` | Project covers, screenshots, architecture diagrams (one folder per project slug) |
| `certificates/` | Certificate scans and issuer marks |
| `og/` | Social share image, 1200x630 |
| (root) | `resume.pdf`, `apple-icon.png` |

Every image is rendered through `next/image`, which needs the real pixel
dimensions declared alongside the path in the matching file under `src/data`.
