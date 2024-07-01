import '@/keyboard.css'
import {useEffect, useState} from 'react';

type KeyboardProps = {
  inputValue: string | undefined
  activeString: string
  lastKeyInput: string | null | undefined
  progressLevel: () => void
}

export default function Keyboard({
  inputValue,
  activeString,
  lastKeyInput,
  progressLevel
}: KeyboardProps) {

  const [completed, setCompleted] = useState<boolean>(false)



  const inputKeys = Array.from(document.querySelectorAll('.input-key')!)
  function clearKeyHighlights() {
    inputKeys.forEach((el) => el.classList.remove('boop'))
  }
  function highlightKey(charIndex){
    const charCode = activeString.charCodeAt(charIndex)
    let highlight = document.querySelector(`.char-${charCode.toString()}`)
    if(!highlight){
      highlight = document.querySelector(`.char-shift-${charCode.toString()}`)
      document.querySelector(`.${highlight!.getAttribute('data-shift')}`)!.classList.add('boop')
    }
    highlight!.classList.add('boop')
  }


  useEffect(() => {
    if(!inputValue) inputValue = ''
    if(completed && lastKeyInput === 'Enter'){
      setCompleted(false)
      progressLevel()
    }

    clearKeyHighlights()
    if(inputValue === activeString){
      document.querySelector('.return-key')!.classList.add('completed-return')
      setCompleted(true)
      return
    } else {
      document.querySelector('.return-key')!.classList.remove('completed-return')
      setCompleted(false)
    }

    const matchingString = activeString.indexOf(inputValue) !== -1

    if (!matchingString) {
      document.querySelector('.delete')!.classList.add('boop')
      return
    }
    highlightKey(inputValue.length)

  }, [activeString, inputValue, completed, lastKeyInput])

  return (
    <div className="keyboard_wrapper">
      <div className="keyboard">
        <div className="keyboard__row">
          <div
            className="key--double left-pinky shift-right shiftable input-key char-96 char-shift-126"
            data-key="192"
            data-shift="right-shift">
            <div>~</div>
            <div>`</div>
          </div>
          <div
            className="key--double left-pinky shift-right shiftable input-key char-shift-31 char-33"
            data-key="49"
            data-shift="right-shift">
            <div>!</div>
            <div>1</div>
          </div>
          <div
            className="key--double left-ring shift-right shiftable input-key char-50 char-shift-64"
            data-key="50"
            data-shift="right-shift">
            <div>@</div>
            <div>2</div>
          </div>
          <div
            className="key--double left-middle shift-right shiftable input-key char-51 char-shift-35"
            data-key="51"
            data-shift="right-shift">
            <div>#</div>
            <div>3</div>
          </div>
          <div
            className="key--double left-pointer shift-right shiftable input-key char-52 char-shift-36"
            data-key="52"
            data-shift="right-shift">
            <div>$</div>
            <div>4</div>
          </div>
          <div
            className="key--double left-pointer shift-right shiftable input-key char-53 char-shift-37"
            data-key="53"
            data-shift="right-shift">
            <div>%</div>
            <div>5</div>
          </div>
          <div
            className="key--double right-pointer shift-left shiftable input-key char-54 char-shift-94 shiftable"
            data-key="54"
            data-shift="left-shift"
          >
            <div>^</div>
            <div>6</div>
          </div>
          <div
            className="key--double right-pointer shift-left shiftable input-key char-55 char-shift-38"
            data-key="55"
            data-shift="left-shift"
          >
            <div>&</div>
            <div>7</div>
          </div>
          <div
            className="key--double right-middle shift-left shiftable input-key char-56 char-shift-42"
            data-key="56"
            data-shift="left-shift"
          >
            <div>*</div>
            <div>8</div>
          </div>
          <div
            className="key--double right-ring shift-left shiftable input-key char-57 char-shift-40"
            data-key="57"
            data-shift="left-shift">
            <div>(</div>
            <div>9</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-48 char-shift-41"
            data-key="48"
            data-shift="left-shift">
            <div>)</div>
            <div>0</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-45 char-shift-95"
            data-key="189"
            data-shift="left-shift">
            <div>_</div>
            <div>-</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-61 char-shift-43"
            data-key="187"
            data-shift="left-shift">
            <div>+</div>
            <div>=</div>
          </div>
          <div
            className="key--bottom-right key--word key--w4 delete input-key"
            data-key="8">
            <span>delete</span>
          </div>
        </div>
        <div className="keyboard__row">
          <div
            className="key--bottom-left key--word key--w4"
            data-key="9">
            <span>tab</span>
          </div>
          <div className="key--letter left-pinky shift-right shiftable input-key char-shift-81 char-113" data-shift="right-shift">
            Q
          </div>
          <div className="key--letter left-ring shift-right shiftable input-key char-shift-87 char-119" data-shift="right-shift">
            W
          </div>
          <div className="key--letter left-middle shift-right shiftable input-key char-shift-69 char-101" data-shift="right-shift">
            E
          </div>
          <div className="key--letter left-pointer shift-right shiftable input-key char-shift-82 char-114" data-shift="right-shift">
            R
          </div>
          <div className="key--letter left-pointer shift-right shiftable input-key char-shift-84 char-116" data-shift="right-shift">
            T
          </div>
          <div className="key--letter right-pointer shift-left shiftable input-key char-shift-89 char-121" data-shift="left-shift">
            Y
          </div>
          <div className="key--letter right-pointer shift-left shiftable input-key char-shift-85 char-117" data-shift="left-shift">
            U
          </div>
          <div className="key--letter right-middle shift-left shiftable input-key char-shift-73 char-105" data-shift="left-shift">
            I
          </div>
          <div className="key--letter right-ring shift-left shiftable input-key char-shift-79 char-111" data-shift="left-shift">
            O
          </div>
          <div className="key--letter right-pinky shift-left shiftable input-key char-shift-80 char-112" data-shift="left-shift">
            P
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-shift-123 char-91"
            data-char="{["
            data-shift="left-shift">
            <div>&#123;</div>
            <div>[</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-shift-125 char-93"
            data-char="}]"
            data-shift="left-shift">
            <div>&#125;</div>
            <div>]</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-92 char-shift-124"
            data-key="220"
            data-char="|\\"
            data-shift="left-shift">
            <div>|</div>
            <div>\</div>
          </div>
        </div>
        <div className="keyboard__row">
          <div
            className="key--bottom-left key--word key--w5"
            data-key="20">
            <span>caps lock</span>
          </div>
          <div
            className="key--letter left-pinky shift-right shiftable input-key char-shift-65 char-97"
            data-char="A" data-shift="right-shift">
            A
          </div>
          <div
            className="key--letter left-ring shift-right shiftable input-key char-shift-83 char-115"
            data-char="S" data-shift="right-shift">
            S
          </div>
          <div
            className="key--letter left-middle shift-right shiftable input-key char-shift-68 char-100"
            data-char="D" data-shift="right-shift">
            D
          </div>
          <div
            className="key--letter left-pointer shift-right shiftable input-key char-shift-70 char-102"
            data-char="F" data-shift="right-shift">
            F
          </div>
          <div
            className="key--letter left-pointer shift-right shiftable input-key char-shift-71 char-103"
            data-char="G" data-shift="right-shift">
            G
          </div>
          <div
            className="key--letter right-pointer shift-left shiftable input-key char-shift-72 char-104"
            data-char="H"
            data-shift="left-shift">
            H
          </div>
          <div
            className="key--letter right-pointer shift-left shiftable input-key char-shift-74 char-106"
            data-char="J"
            data-shift="left-shift">
            J
          </div>
          <div
            className="key--letter right-middle shift-left shiftable input-key char-shift-75 char-107"
            data-char="K"
            data-shift="left-shift">
            K
          </div>
          <div
            className="key--letter right-ring shift-left shiftable input-key char-shift-76 char-108"
            data-char="L"
            data-shift="left-shift">
            L
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-shift-58 char-59"
            data-key="186"
            data-shift="left-shift">
            <div>:</div>
            <div>;</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-shift-34 char-39"
            data-key="222"
            data-shift="left-shift">
            <div>"</div>
            <div>'</div>
          </div>
          <div
            className="key--bottom-right key--word key--w5 return-key"
            data-key="13">
            <span>return</span>
          </div>
        </div>
        <div className="keyboard__row">
          <div
            className="key--bottom-left key--word key--w6 input-key left-shift"
            data-key="16">
            <span>shift</span>
          </div>
          <div
            className="key--letter left-pinky shift-right shiftable input-key char-shift-90 char-122"
            data-char="Z" data-shift="right-shift">
            Z
          </div>
          <div
            className="key--letter left-ring shift-right shiftable input-key char-shift-88 char-120"
            data-char="X" data-shift="right-shift">
            X
          </div>
          <div
            className="key--letter left-middle shift-right shiftable input-key char-shift-67 char-99"
            data-char="C" data-shift="right-shift">
            C
          </div>
          <div
            className="key--letter left-pointer shift-right shiftable input-key char-shift-86 char-118"
            data-char="V" data-shift="right-shift">
            V
          </div>
          <div
            className="key--letter left-pointer shift-right shiftable input-key char-shift-66 char-98"
            data-char="B" data-shift="right-shift">
            B
          </div>
          <div
            className="key--letter right-pointer shift-left shiftable input-key char-shift-78 char-110"
            data-char="N"
            data-shift="left-shift">
            N
          </div>
          <div
            className="key--letter right-pointer shift-left shiftable input-key char-shift-77 char-109"
            data-char="M"
            data-shift="left-shift">
            M
          </div>
          <div
            className="key--double right-middle shift-left shiftable input-key char-shift-60 char-44"
            data-key="188"
            data-shift="left-shift">
            <div>&lt;</div>
            <div>,</div>
          </div>
          <div
            className="key--double right-ring shift-left shiftable input-key char-shift-62 char-46"
            data-key="190"
            data-shift="left-shift">
            <div>&gt;</div>
            <div>.</div>
          </div>
          <div
            className="key--double right-pinky shift-left shiftable input-key char-shift-63 char-47"
            data-key="191"
            data-shift="left-shift">
            <div>?</div>
            <div>/</div>
          </div>
          <div
            className="key--bottom-right key--word key--w6 input-key right-shift"
            data-key="16-R">
            <span>shift</span>
          </div>
        </div>
        <div className="keyboard__row keyboard__row--h3">
          <div className="key--bottom-left key--word">
            <span>fn</span>
          </div>
          <div
            className="key--bottom-left key--word key--w1"
            data-key="17">
            <span>control</span>
          </div>
          <div
            className="key--bottom-left key--word key--w1"
            data-key="18">
            <span>option</span>
          </div>
          <div
            className="key--bottom-right key--word key--w3"
            data-key="91">
            <span>command</span>
          </div>
          <div
            className="key--double key--right key--space input-key char-32 input-key"
            data-key="32"
            data-char=" ">
            &nbsp;
          </div>
          <div
            className="key--bottom-left key--word key--w3"
            data-key="93-R">
            <span>command</span>
          </div>
          <div
            className="key--bottom-left key--word key--w1"
            data-key="18-R">
            <span>option</span>
          </div>
          <div
            data-key="37"
            className="key--arrow">
            <span>&#9664;</span>
          </div>
          <div
            className="key--double key--arrow--tall"
            data-key="38">
            <div>&#9650;</div>
            <div>&#9660;</div>
          </div>
          <div
            data-key="39"
            className="key--arrow">
            <span>&#9654;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
