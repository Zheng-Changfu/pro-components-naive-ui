import type { ExpressionScope } from 'pro-components-hooks'
import { useCompile } from 'pro-components-hooks'
import { computed, toRef, useAttrs } from 'vue'
import type { ProFormListProps } from './props'

export function useCompileFormListProps(props: ProFormListProps, scope: ExpressionScope) {
  const attrs = useAttrs()
  const parsedMin = useCompile(toRef(props, 'min'), { scope })
  const parsedMax = useCompile(toRef(props, 'max'), { scope })
  const parsedPosition = useCompile(toRef(props, 'position'), { scope })
  /**
   * attrs 虽然是 proxy，但 isProxy 返回 false，所以浅克隆一层
   */
  const parsedAttrs = useCompile(computed(() => ({ ...attrs })), { scope })
  const parsedCopyButtonProps = useCompile(toRef(props, 'copyButtonProps'), { scope })
  const parsedRemoveButtonProps = useCompile(toRef(props, 'removeButtonProps'), { scope })
  const parsedCreatorButtonProps = useCompile(toRef(props, 'creatorButtonProps'), { scope })

  return {
    min: parsedMin,
    max: parsedMax,
    attrs: parsedAttrs,
    position: parsedPosition,
    copyButtonProps: parsedCopyButtonProps,
    removeButtonProps: parsedRemoveButtonProps,
    creatorButtonProps: parsedCreatorButtonProps,
  }
}
