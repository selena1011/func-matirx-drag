import * as util from './util'

let E_SIZER = {}
let ELEMENT = null
export default class DragMatrix {
    constructor( el ){
        ELEMENT = el
        ELEMENT.bindMouseDownEvent = this.bindMouseDownEvent
        ELEMENT.bindMouseMoveEvent = this.bindMouseMoveEvent

        // 初始化
        this.init()
    }

    /*
        初始化方法
        用于执行 事件绑定 
     */
    init(){
        // 绑定mousedown事件 
        ELEMENT.addEventListener('mousedown', ELEMENT.bindMouseDownEvent, false)        
        // 绑定mouseup事件
        ELEMENT.addEventListener('mouseup', ( evte )=>{
            document.removeEventListener('mousemove', ELEMENT.bindMouseMoveEvent)
        }, false)
    }

    /*
        绑定mousedown事件 
     */
    bindMouseDownEvent(
        evte
    ){
        evte.stopPropagation()
        evte.preventDefault()
        
        // 记录鼠标点击时的坐标
        E_SIZER['clientX'] = evte.clientX
        E_SIZER['clientY'] = evte.clientY
        // 记录鼠标目标元素的X-Y位置偏置值
        E_SIZER['targetX'] = evte.target.offsetLeft
        E_SIZER['targetY'] = evte.target.offsetTop

        // 计算坐标边界巨鹿
        E_SIZER['distX'] = E_SIZER['clientX'] - E_SIZER['targetX']
        E_SIZER['distY'] = E_SIZER['clientY'] - E_SIZER['targetY']

        // 绑定mousemove事件
        document.addEventListener('mousemove', ELEMENT.bindMouseMoveEvent, false)
    }

    /*
        绑定mouseover事件 
     */
    bindMouseMoveEvent(
        evte
    ){
        evte.stopPropagation()
        evte.preventDefault()

        let moveX = evte.clientX - E_SIZER['distX']
        let moveY = evte.clientY - E_SIZER['distY']
        
        // 写入style
        ELEMENT.style.left = `${moveX}px`
        ELEMENT.style.top = `${moveY}px`
    }
}