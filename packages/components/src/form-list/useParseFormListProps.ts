import type { ExpressionScope } from 'pro-components-hooks'
import { useCompile } from 'pro-components-hooks'
import { toRef } from 'vue'
import type { ProFormListProps } from './props'

export function useParseFormListProps(props: ProFormListProps, scope: ExpressionScope) {
  const parsedMin = useCompile(toRef(props, 'min'), { scope })
  const parsedMax = useCompile(toRef(props, 'max'), { scope })
  const parsedPosition = useCompile(toRef(props, 'position'), { scope })
  const parsedCopyButtonProps = useCompile(toRef(props, 'copyButtonProps'), { scope })
  const parsedRemoveButtonProps = useCompile(toRef(props, 'removeButtonProps'), { scope })
  const parsedCreatorButtonProps = useCompile(toRef(props, 'creatorButtonProps'), { scope })

  return {
    min: parsedMin,
    max: parsedMax,
    position: parsedPosition,
    copyButtonProps: parsedCopyButtonProps,
    removeButtonProps: parsedRemoveButtonProps,
    creatorButtonProps: parsedCreatorButtonProps,
  }
}
