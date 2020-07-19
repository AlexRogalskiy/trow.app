import { FunctionalComponent, ComponentChildren, h } from 'preact'
import * as style from './style.css'
import cn from 'classnames'

interface BoxElementInterface {
    children: ComponentChildren
    flexDirection?: 'column' | 'row'
    justifyContent?:
        | 'start'
        | 'end'
        | 'center'
        | 'between'
        | 'around'
        | 'evenly'
    alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
}

const BoxElement: FunctionalComponent<BoxElementInterface> = ({
    children,
    flexDirection = 'row',
    justifyContent = 'start',
    alignItems = 'start',
}: BoxElementInterface) => (
    <div
        class={cn(
            style.box,
            style[flexDirection],
            style[`justify-${justifyContent}`],
            style[`align-${alignItems}`]
        )}
    >
        {children}
    </div>
)

export default BoxElement
