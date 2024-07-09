
async function ManageLenghtArray(arr, start,stop) {
    let tempData = []
    for (let i = start; i < stop; i++){
        tempData.push(arr[i])
    }
    return tempData
}
const root = document.getElementById("root");
const container = document.querySelector(".photo-container");
async function FetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");

    return await res.json()
 
    
}
let ConstantNumber = 12


 let start = 0;
 let Stop = ConstantNumber;
function MakePopUp(image) {
    const Shade = document.createElement("div")
    Shade.classList.add("shade")
    const ShadeImage = document.createElement("div")
    ShadeImage.classList.add("shadeImage");
    const pic = document.createElement("img")
    pic.src = image
    const ToggleButton = document.createElement("button")
    ToggleButton.classList.add("toggle-button")
    ToggleButton.innerText = "X";
    Shade.style.transition=1
    ShadeImage.style.transform="scale(1)"
    ShadeImage.appendChild(pic)
    ToggleButton.addEventListener("click", () => {
        Shade.style.display="none"
    })
    Shade.append(ShadeImage, ToggleButton)
   
    root.appendChild(Shade)

}
function MakeCard(item) {
    const card = document.createElement("div")
    card.classList.add("card")
    
    const cardImageDiv = document.createElement("div")
    cardImageDiv.classList.add("card-image")
    const cardimage = document.createElement("img")
    if (item?.url) {
        cardimage.src = item?.url;
        cardImageDiv.append(cardimage);
    } else {
        const loader = document.createElement("div")
        loader.classList.add("loader")
        cardImageDiv.appendChild(loader)
        cardImageDiv.style.display = "flex"
        cardImageDiv.style.justifyContent="center"
  }
    
    const textDiv = document.createElement("div")
    textDiv.classList.add("card-text")
    
    textDiv.innerText = item?.title
    card.append(cardImageDiv, textDiv)
    card.addEventListener("click", () => {
        MakePopUp(item?.url)
    })
    return card

}
async function ClickOnNumber(number,item) {
     const data = await FetchData();
   
    const temparr = await ManageLenghtArray(data, number, number+ConstantNumber);
    container.textContent = "";
    CardArray(temparr);
    
}
function ConvertPengrationNumnerArray(start,stop) {
    let arr = []
    for (let i = start; i <stop ; i++)
    {
        const numberElement = document.createElement("div")
        numberElement.classList.add("number")
        numberElement.innerText = i
        numberElement.id = i
        numberElement.addEventListener("click", () => {
            ClickOnNumber(i,numberElement)
        })
        arr.push(numberElement)

    }
    return arr
    
}
async function Penigration() {
     const data = await FetchData()
    let numberarr = ConvertPengrationNumnerArray(start,Stop)
    const PenigrationDiv = document.createElement("div")
    PenigrationDiv.classList.add("panigration");
    const penContainer = document.createElement("div")
    penContainer.classList.add('container')
    const prevButton = document.createElement("button")
    const NormalBox = document.createElement("div");
    prevButton.innerText = "Previous"
    prevButton.addEventListener("click", async () => {
        if (start > 0) {
            start -= ConstantNumber;
            Stop -= ConstantNumber;
            const temparr = await ManageLenghtArray(data, start, Stop);
            container.textContent = "";
            CardArray(temparr);
            numberarr = ConvertPengrationNumnerArray(start, Stop);
            NormalBox.textContent=""
            NormalBox.append(...numberarr);
        } else {
            prevButton.disabled=true
        }
        
       });
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", async () => {
        start += ConstantNumber
        Stop+=ConstantNumber
        const temparr = await ManageLenghtArray(data,start,Stop)
        container.textContent = ""
        prevButton.disabled = false;
        CardArray(temparr)
        numberarr = ConvertPengrationNumnerArray(start, Stop);
         NormalBox.textContent = "";
         NormalBox.append(...numberarr);
    })
    
    NormalBox.classList.add("number-box")
    NormalBox.append(...numberarr)
    penContainer.append(prevButton, NormalBox, nextButton)
    PenigrationDiv.appendChild(penContainer)
    console.log(PenigrationDiv);
    root.appendChild(PenigrationDiv)

}

async function App() {
    const data = await FetchData()
   
    const lengthArr = await ManageLenghtArray(data, start,Stop)
    if (!data) {
        const loader_section = document.createElement("div")
    
        loader_section.classList.add("loader-sec")
        const loader = document.createElement("div")
        loader.classList.add("loader")
        loader_section.appendChild(loader)
        root.appendChild(loader_section)
    } else {
        CardArray(lengthArr)
      
        Penigration(data)
    }

}
function CardArray(data) {
      const cardArray = data.map((item) => {
        return MakeCard(item);
      });
    container.append(...cardArray);
      
}
App()


