import { clerkMiddleware } from "@clerk/nextjs/server"

// clerkMiddleware() por defecto no protege ninguna ruta a menos que se
// especifique de manera explícita (p. ej. usando createRouteMatcher)
// o se maneje en cada página. Para este boilerplate, mantenemos
// la protección delegada a las páginas/componentes o podemos
// agregar la lógica del matcher aquí si es necesario.
export default clerkMiddleware()

export const config = {
  matcher: [
    // Todo excepto estáticos, imágenes y favicon.
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
