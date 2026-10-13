import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

type ButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean
  variant?: 'primary' | 'outline' | 'ghost'
}

function Button({ asChild = false, variant = 'primary', className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn('button', `button--${variant}`, className)} {...props} />
}

export { Button }
