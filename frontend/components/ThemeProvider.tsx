// Theme initialisation is handled by the blocking <script> in layout.tsx.
// This component exists as a convenience wrapper if a theme context is added later.
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
