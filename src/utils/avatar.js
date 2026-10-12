// প্রোফাইল ছবি: ব্রাউজারে ছোট করে (বর্গাকার, সর্বোচ্চ ৫১২ পিক্সেল) JPEG বানায়।
// বড় ফোনের ছবিও এতে ২ MB-এর নিচে নেমে আসে।
const MAX_SIDE = 512
const JPEG_QUALITY = 0.85

export const AVATAR_MAX_INPUT_BYTES = 15 * 1024 * 1024 // ইনপুটের সীমা (১৫ MB)

export function avatarUrl(path, apiBase = '') {
  if (!path) return null
  if (path.startsWith('http')) return path
  return `${apiBase}${path}`
}

export function shrinkImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('শুধু ছবি বাছাই করুন'))
      return
    }

    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(url)

      // বর্গাকার করে কেটে নিই (মাঝখান থেকে)
      const side = Math.min(image.width, image.height)
      const sx = (image.width - side) / 2
      const sy = (image.height - side) / 2
      const size = Math.min(MAX_SIDE, side)

      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext('2d')
      context.drawImage(image, sx, sy, side, side, 0, 0, size, size)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('ছবিটি প্রক্রিয়া করা যায়নি'))
            return
          }
          resolve(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }))
        },
        'image/jpeg',
        JPEG_QUALITY,
      )
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('ছবিটি খোলা যায়নি'))
    }

    image.src = url
  })
}