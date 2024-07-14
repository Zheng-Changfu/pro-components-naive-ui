import type { ExpressionScope } from 'pro-components-hooks'
import { useCompile } from 'pro-components-hooks'
import { computed, toRef, useAttrs } from 'vue'
import type { ProFormListProps } from './props'

export function useCompileFormListProps(props: ProFormListProps, scope: ExpressionScope) {
  const attrs = useAttrs()
  const compiledMin = useCompile(toRef(props, 'min'), { scope })
  const compiledMax = useCompile(toRef(props, 'max'), { scope })
  const compiledPosition = useCompile(toRef(props, 'position'), { scope })
  /**
   * attrs 虽然是 proxy，但 isProxy 返回 false，所以浅克隆一层
   */
  const compiledAttrs = useCompile(computed(() => ({ ...attrs })), { scope })
  const compiledCopyButtonProps = useCompile(toRef(props, 'copyButtonProps'), { scope })
  const compiledRemoveButtonProps = useCompile(toRef(props, 'removeButtonProps'), { scope })
  const compiledCreatorButtonProps = useCompile(toRef(props, 'creatorButtonProps'), { scope })

  return {
    min: compiledMin,
    max: compiledMax,
    attrs: compiledAttrs,
    position: compiledPosition,
    copyButtonProps: compiledCopyButtonProps,
    removeButtonProps: compiledRemoveButtonProps,
    creatorButtonProps: compiledCreatorButtonProps,
  }
}
