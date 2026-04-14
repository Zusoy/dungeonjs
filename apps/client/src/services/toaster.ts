import type { ReactNode } from 'react'
import { toast as sonner } from 'sonner'

export enum ToastType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

export type ToastProps = {
  content: string,
  description?: string|ReactNode
  type: ToastType
}

export const toast = ({ content, description, type }: ToastProps) => {
  switch (type) {
    default:
    case ToastType.Success:
      sonner.success(content, { description })
      break

    case ToastType.Warning:
      sonner.warning(content, { description })
      break

    case ToastType.Error:
      sonner.error(content, { description })
      break
    
    case ToastType.Info:
      sonner.info(content, { description })
      break
  }
}
