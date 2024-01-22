import '@/keyboard.css';
import {useEffect} from "react";

type KeyboardProps = {
    activeString: string,
    inputValue: string
}

export default function Keyboard({activeString, inputValue}: KeyboardProps) {

    useEffect(() => {
        console.log(inputValue)
            const inputKeys = Array.from(document.querySelectorAll('.input-key')!)
            function clearKeyHighlights(){
                inputKeys.forEach(el => el.classList.remove('boop'))
            }

            const matchingString = activeString.indexOf(inputValue) !== -1

            if(!matchingString){
                clearKeyHighlights()
                document.querySelector('.delete')!.classList.add('boop')
                return
            } else {
                document.querySelector('.delete')!.classList.remove('boop')
            }

            const nextCharCode = activeString.charCodeAt(inputValue.length);
            let highlight = document.querySelector(`.char-${nextCharCode.toString()}`)

            if(highlight && nextCharCode){
                    clearKeyHighlights()
                    highlight.classList.add('boop');
            } else if(nextCharCode) {
                highlight = document.querySelector(`.char-shift-${nextCharCode.toString()}`)
                if(highlight){
                    clearKeyHighlights()
                    if(highlight.classList.contains('shift-left')){
                        document.querySelector('.left-shift')!.classList.add('boop')
                    } else {
                        document.querySelector('.right-shift')!.classList.add('boop')
                    }
                    highlight.classList.add('boop');
                }
            }


    }, [activeString, inputValue]);



    return (
        <div className="keyboard_wrapper">
        <div className="keyboard">

            <div className="keyboard__row">
                <div className="key--double left-pinky shift-right input-key char-96 char-shift-126" data-key="192">
                    <div>~</div>
                    <div>`</div>
                </div>
                <div className="key--double left-pinky shift-right input-key char-shift-41 char-33" data-key="49">
                    <div>!</div>
                    <div>1</div>
                </div>
                <div className="key--double left-ring shift-right input-key char-50 char-shift-64" data-key="50">
                    <div>@</div>
                    <div>2</div>
                </div>
                <div className="key--double left-middle shift-right input-key char-51 char-shift-35" data-key="51">
                    <div>#</div>
                    <div>3</div>
                </div>
                <div className="key--double left-pointer shift-right input-key char-52 char-shift-36" data-key="52">
                    <div>$</div>
                    <div>4</div>
                </div>
                <div className="key--double left-pointer shift-right input-key char-53 char-shift-37" data-key="53">
                    <div>%</div>
                    <div>5</div>
                </div>
                <div className="key--double right-pointer shift-left input-key char-54 char-shift-94" data-key="54">
                    <div>^</div>
                    <div>6</div>
                </div>
                <div className="key--double right-pointer shift-left input-key char-55 char-shift-38" data-key="55">
                    <div>&</div>
                    <div>7</div>
                </div>
                <div className="key--double right-middle shift-left input-key char-56 char-shift-42" data-key="56">
                    <div>*</div>
                    <div>8</div>
                </div>
                <div className="key--double right-ring shift-left input-key char-57 char-shift-40" data-key="57">
                    <div>(</div>
                    <div>9</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-48 char-shift-41" data-key="48">
                    <div>)</div>
                    <div>0</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-45 char-shift-95" data-key="189">
                    <div>_</div>
                    <div>-</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-61 char-shift-43" data-key="187">
                    <div>+</div>
                    <div>=</div>
                </div>
                <div className="key--bottom-right key--word key--w4 delete" data-key="8">
                    <span>delete</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className="key--bottom-left key--word key--w4" data-key="9">
                    <span>tab</span>
                </div>
                <div className="key--letter left-pinky shift-right input-key char-shift-81 char-113">Q</div>
                <div className="key--letter left-ring shift-right input-key char-shift-87 char-119">W</div>
                <div className="key--letter left-middle shift-right input-key char-shift-69 char-101">E</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-82 char-114">R</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-84 char-116">T</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-89 char-121">Y</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-85 char-117">U</div>
                <div className="key--letter right-middle shift-left input-key char-shift-73 char-105">I</div>
                <div className="key--letter right-ring shift-left input-key char-shift-79 char-111">O</div>
                <div className="key--letter right-pinky shift-left input-key char-shift-80 char-112">P</div>
                <div className="key--double right-pinky shift-left input-key char-shift-123 char-91" data-char="{[">
                    <div>&#123;</div>
                    <div>[</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-shift-125 char-93" data-char="}]">
                    <div>&#125;</div>
                    <div>]</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-92 char-shift-124" data-key="220" data-char="|\\">
                    <div>|</div>
                    <div>\</div>
                </div>
            </div>
            <div className="keyboard__row">
                <div className="key--bottom-left key--word key--w5" data-key="20">
                    <span>caps lock</span>
                </div>
                <div className="key--letter left-pinky shift-right input-key char-shift-65 char-97" data-char="A">A</div>
                <div className="key--letter left-ring shift-right input-key char-shift-83 char-115" data-char="S">S</div>
                <div className="key--letter left-middle shift-right input-key char-shift-68 char-100" data-char="D">D</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-70 char-102" data-char="F">F</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-71 char-103" data-char="G">G</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-72 char-104" data-char="H">H</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-74 char-106" data-char="J">J</div>
                <div className="key--letter right-middle shift-left input-key char-shift-75 char-107" data-char="K">K</div>
                <div className="key--letter right-ring shift-left input-key char-shift-76 char-108" data-char="L">L</div>
                <div className="key--double right-pinky shift-left input-key char-shift-58 char-59" data-key="186">
                    <div>:</div>
                    <div>;</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-shift-34 char-39" data-key="222">
                    <div>"</div>
                    <div>'</div>
                </div>
                <div className="key--bottom-right key--word key--w5" data-key="13">
                    <span>return</span>
                </div>
            </div>
            <div className="keyboard__row">
                <div className="key--bottom-left key--word key--w6 input-key left-shift" data-key="16">
                    <span>shift</span>
                </div>
                <div className="key--letter left-pinky shift-right input-key char-shift-90 char-122" data-char="Z">Z</div>
                <div className="key--letter left-ring shift-right input-key char-shift-88 char-120" data-char="X">X</div>
                <div className="key--letter left-middle shift-right input-key char-shift-67 char-99" data-char="C">C</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-86 char-118" data-char="V">V</div>
                <div className="key--letter left-pointer shift-right input-key char-shift-66 char-98" data-char="B">B</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-78 char-110" data-char="N">N</div>
                <div className="key--letter right-pointer shift-left input-key char-shift-77 char-109" data-char="M">M</div>
                <div className="key--double right-middle shift-left input-key char-shift-60 char-44" data-key="188">
                    <div>&lt;</div>
                    <div>,</div>
                </div>
                <div className="key--double right-ring shift-left input-key char-shift-62 char-46" data-key="190">
                    <div>&gt;</div>
                    <div>.</div>
                </div>
                <div className="key--double right-pinky shift-left input-key char-shift-63 char-47" data-key="191">
                    <div>?</div>
                    <div>/</div>
                </div>
                <div className="key--bottom-right key--word key--w6 input-key right-shift" data-key="16-R">
                    <span>shift</span>
                </div>
            </div>
            <div className="keyboard__row keyboard__row--h3">
                <div className="key--bottom-left key--word">
                    <span>fn</span>
                </div>
                <div className="key--bottom-left key--word key--w1" data-key="17">
                    <span>control</span>
                </div>
                <div className="key--bottom-left key--word key--w1" data-key="18">
                    <span>option</span>
                </div>
                <div className="key--bottom-right key--word key--w3" data-key="91">
                    <span>command</span>
                </div>
                <div className="key--double key--right key--space input-key char-32 input-key" data-key="32" data-char=" ">
                    &nbsp;
                </div>
                <div className="key--bottom-left key--word key--w3" data-key="93-R">
                    <span>command</span>
                </div>
                <div className="key--bottom-left key--word key--w1" data-key="18-R">
                    <span>option</span>
                </div>
                <div data-key="37" className="key--arrow">
                    <span>&#9664;</span>
                </div>
                <div className="key--double key--arrow--tall" data-key="38">
                    <div>&#9650;</div>
                    <div>&#9660;</div>
                </div>
                <div data-key="39" className="key--arrow">
                    <span>&#9654;</span>
                </div>
            </div>
        </div>
</div>
    )
}