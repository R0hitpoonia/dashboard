import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/customers/')({
  component: () => <div>Hello /_layout/customers/!</div>
})