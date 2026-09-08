import { put } from "@vercel/blob"
import { NextResponse, type NextRequest } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Seleccioná una imagen." }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Usá una imagen JPG, PNG o WebP." }, { status: 400 })
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "La imagen no puede superar los 5 MB." }, { status: 400 })
  }

  const extension = file.type.split("/")[1]
  const blob = await put(`staff/${crypto.randomUUID()}.${extension}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  })

  return NextResponse.json({ url: blob.url })
}
