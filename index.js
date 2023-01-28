let item;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

  document.querySelectorAll('input').forEach((item,i)=>{
    item.addEventListener('change', (event)=>{
      console.log(event)
      if(item.value.length!=''){
          item.style.borderColor='green'
      }else{
        item.style.borderColor='red'
        item.style.animation = 'shake 0.5s'
        setTimeout(()=>{
          item.style.animation = ''
        },500)
      }

    })

  })
function saveBMP(){
  let valid = false;
  document.querySelectorAll('input').forEach((item) => {
    if(item.value.length !=''){
      item.classList.add('valid')
      item.classList.remove('invalid')
    }
    else{
    item.classList.add('invalid')
        item.classList.remove('valid')
    }
  });

   item = {
    name: document.getElementById('name').value,
    number: document.getElementById('number').value,
    size : {
      pieces: document.getElementById('piece').value,
      grams: document.getElementById('weight').value
    },
    calories:{
      total: document.getElementById('calories').value,
      fat:{
        saturated:{
        weight: document.getElementById('saturatedW').value,
        percentage: document.getElementById('saturatedP').value+'%'
      },
        trans:{
          weight: document.getElementById('transW').value,
          percentage: document.getElementById('transP').value+'%'
        },
        total:{
          weight: document.getElementById('fatW').value,
          percentage: document.getElementById('fatP').value+'%'
        }
      },
      cholesterol:{
        weight: document.getElementById('cholesterolW').value,
        percentage: document.getElementById('cholesterolP').value+'%'
      },
      sodium:{
        weight: document.getElementById('sodiumW').value,
        percentage: document.getElementById('sodiumP').value+'%'
      },
      carbohydrate:{
        weight: document.getElementById('carbohydrateW').value,
        percentage: document.getElementById('carbohydrateP').value+'%'
      },
      fibers:{
        weight: document.getElementById('fiberW').value,
        percentage: document.getElementById('fiberP').value+'%'
      },
      sugars:{
        weight: document.getElementById('sugarW').value,
        percentage: document.getElementById('sugarP').value+'%'
      },
      protein:{
        weight: document.getElementById('proteinW').value,
      },
      vitaminD:{
        percentage: document.getElementById('vitaminP').value+'%'
      },
      calcium:{
        weight: document.getElementById('calciumW').value,
        percentage: document.getElementById('calciumP').value+'%'
      },
      iron:{
        weight: document.getElementById('ironW').value,
        percentage: document.getElementById('ironP').value+'%'
      },
      potassium:{
        weight: document.getElementById('potassiumW').value,
        percentage: document.getElementById('potassiumP').value+'%'
      },
    }
  }

  if(document.querySelector('.invalid')){
    valid = false;
  }
  else{
    valid = true
  }

console.log(valid)
if(valid){
  DrawCanvas();
  CanvasToBMP();
}else{
  document.querySelector('.message').innerText='Not Valid. Please check highlighted inputs';
}

}

function exampleBMP(){
   item = {
    name: 'R079/5',
    number: 10000,
    size : {
      pieces: 6,
      grams: 30
    },
    calories:{
      total: 215,
      fat:{
        saturated:{
        weight:'3',
        percentage:  '15%'
      },
        trans:{
          weight:'0',
          percentage:  '0%'
        },
        total:{
          weight:'13',
          percentage:  '16%'
        }
      },
      cholesterol:{
        weight:'4',
        percentage:'1%'
      },
      sodium:{
        weight:'6',
        percentage:'2%'
      },
      carbohydrate:{
        weight:'17',
        percentage:'6%'
      },
      fibers:{
        weight:'2',
        percentage:'7%'
      },
      sugars:{
        weight:'13',
        percentage:'26%'
      },
      protein:{
        weight:'3'
      },
      vitaminD:{
        percentage:'0%'
      },
      calcium:{
        weight:'49',
        percentage:'4%'
      },
      iron:{
        weight:'0',
        percentage:'0%'
      },
      potassium:{
        weight:'78',
        percentage:'2%'
      },
    }
  }
  DrawCanvas();
  CanvasToBMP()
}

function CanvasToBMP(){
  Jimp.read(canvas.toDataURL(), (err, image) => {
      if (err) throw err;
      image.getBuffer(Jimp.MIME_BMP, (error, buffer) => {
          if (error) throw error;
          // You can then do something with the buffer, for example,
          // download it as a file
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.href = window.URL.createObjectURL(new Blob([buffer], {type: "image/bmp"}));
          a.download = `${item.number}.bmp`;
          a.click();
      });
  });
}
function DrawCanvas(){

// Draw a rectangle on the canvas

// Set the background color to red
ctx.fillStyle = "white";

// Fill the entire canvas with the background color
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set the font and color for the text
ctx.font = "bold 22px sans-serif";
ctx.fillStyle = "black";
// Draw the text on the canvas
ctx.fillText("NUTRITION FACTS", 10, 25);

ctx.font = "bold 22px sans-serif";
ctx.fillStyle = "black";
// Draw the text on the canvas
ctx.fillText("حقائق تغذوية ", 340, 25);

ctx.font = "16px sans-serif";
ctx.fillText("Serving per container varies", 10, 45);

ctx.font = "16px sans-serif";
ctx.fillText("عدد الحصص في العلبة مختلف  ", 290, 45);

ctx.font = "20px sans-serif";
ctx.fillText(`Serving size ${item.size.pieces} pcs`, 10, 70);

ctx.font = "20px sans-serif";
ctx.fillText(`حجم الحصة `, 380, 70);
ctx.font = "20px sans-serif";
ctx.fillText(`${item.size.pieces}`, 360, 70);
ctx.fillText('حبوب ', 318, 70);

ctx.font = "20px sans-serif";
ctx.fillText(`(${item.size.grams}g)`, 220, 70);

DrawLine(0,80,473, 10);
DrawText('Amount per serving', true, 20, 10, 110);
DrawText('Calories', true, 25, 10, 142);
DrawText(`${item.calories.total}`, true, 28, 200, 142);

DrawText('القيمة الغذائية في الحصة', true, 20, 260, 110);
DrawText('السعرات الحرارية', true, 25, 295, 142);

DrawLine(0,150,473, 5);
DrawText('%Daily Value*', false, 22, 60, 175);
DrawText('* نسبة الإحتياج اليومي % ', false, 22, 250, 175);
DrawLine(0,182,473, 2);

//Calories
//Fat
DrawText(`Total Fat ${item.calories.fat.total.weight}g`, true, 20, 10, 205);
DrawText(`${item.calories.fat.total.weight} اجمالي الدهون`, true, 20, 318, 205);
DrawText("غ", true, 20, 305, 205);
DrawText(`${item.calories.fat.total.percentage}`, true, 22, 200, 205);
DrawLine(0,212,473, 2);


//Saturated
DrawText(`Saturated fat ${item.calories.fat.saturated.weight}g`, false, 17, 30, 232);
DrawText(`${item.calories.fat.saturated.weight} الدهون المشبعة`, false, 17, 348, 232);
DrawText("غ", false, 17, 336, 232);
DrawText(`${item.calories.fat.saturated.percentage}`, true, 20, 200, 234);
DrawLine(30,239,420, 2);
//Trans
DrawText(`Trans fat ${item.calories.fat.trans.weight}g`, false, 17, 30, 257);
DrawText(`${item.calories.fat.trans.weight} الدهون المتحولة`, false, 17, 348, 257);
DrawText("غ", false, 17, 336, 257);
DrawText(`${item.calories.fat.trans.percentage}`, true, 20, 205, 259);
DrawLine(30,262,420, 2);

//Cholesterol
DrawText(`Cholesterol  ${item.calories.cholesterol.weight}mg`, true, 20, 10, 285);
DrawText(`${item.calories.cholesterol.weight} الكوليستيرول`, true, 20, 340, 285);
DrawText("ملغ", true, 20, 308, 285);
DrawText(`${item.calories.cholesterol.percentage}`, true, 22, 200, 285);
DrawLine(0,292,473, 2);

//Sodium
DrawText(`Sodium  ${item.calories.sodium.weight}mg`, true, 20, 10, 315);
DrawText(`${item.calories.sodium.weight} الصوديوم`, true, 20, 370, 315);
DrawText("ملغ", true, 20, 338, 315);
DrawText(`${item.calories.sodium.percentage}`, true, 22, 200, 315);
DrawLine(0,322,473, 2);

//Carbohydrate
DrawText(`Total Carbohydrate  ${item.calories.carbohydrate.weight}g`, true, 17, 10, 345);
DrawText(`${item.calories.carbohydrate.weight} إجمالي الكاربوهيدرات`, true, 17, 292, 345);
DrawText("غ", true, 20, 280, 345);
DrawText(`${item.calories.carbohydrate.percentage}`, true, 22, 210, 345);
DrawLine(0,352,473, 2);

//Fibers
DrawText(`Dietary Fiber ${item.calories.fibers.weight}g`, false, 17, 30, 370);
DrawText(`${item.calories.fibers.weight} الألياف الغذائية`, false, 17, 345, 370);
DrawText("غ", false, 17, 335, 370);
DrawText(`${item.calories.fibers.percentage}`, true, 20, 200, 372);
DrawLine(30,377,420, 2);

//Sugars
DrawText(`Total Sugars ${item.calories.sugars.weight}g`, false, 17, 30, 400);
DrawText(`${item.calories.sugars.weight} إجمالي السكريات`, false, 17, 320, 400);
DrawText("غ", false, 17, 310, 400);
DrawText(`${item.calories.sugars.percentage}`, true, 20, 205, 402);
DrawLine(30,407,420, 2);
//Protein
DrawText(`Protein  ${item.calories.protein.weight}g`, true, 20, 10, 430);
DrawText(`${item.calories.protein.weight} البروتين`, true, 20, 388, 430);
DrawText("غ", false, 20, 375, 430);
// DrawText(`${item.protein.percentage}`, true, 22, 250, 385);
DrawLine(0,437,473, 10);

//VitaminD
DrawText('Vitamin D', true, 20, 10, 470);
DrawText('فايتمين دال', true, 20, 378, 470);
DrawText(`${item.calories.vitaminD.percentage}`, true, 22, 205, 470);

//Calcium
DrawText(`Calcium ${item.calories.calcium.weight}g`, true, 20, 10, 495);
DrawText(`${item.calories.calcium.weight} الكالسيوم`, true, 20, 362, 495);
DrawText("ملغ", true, 20, 330, 495);
DrawText(`${item.calories.calcium.percentage}`, true, 22, 205, 495);

//Iron
DrawText(`Iron ${item.calories.iron.weight}g`, true, 20, 10, 520);
DrawText(`${item.calories.iron.weight} الحديد`, true, 20, 399, 520);
DrawText("ملغ", true, 20, 367, 520);
DrawText(`${item.calories.iron.percentage}`, true, 22, 205, 520);

//Potassium
DrawText(`Potassium ${item.calories.potassium.weight}g`, true, 20, 10, 545);
DrawText(`${item.calories.potassium.weight} البوتاسيوم`, true, 20, 352, 545);
DrawText("ملغ", true, 20, 320, 545);
DrawText(`${item.calories.potassium.percentage}`, true, 22, 205, 545);
DrawLine(0,553,473, 2);

DrawText("نسبة الإحتياج اليومي % تنبئ عن نسبة المغذيات لحصة الطعام بالنسبة *", false, 17,30,570);
DrawText("."+"للحمية المعتمدة على 2000 سعرة يومياً مستخدمة لنصائح التغذية العامة", false, 17,30,590);
DrawText(`${item.name}`, false, 15, 10, 610);

}
function DrawLine(xPos,yPos,width,height){
  // Set the fill style to black
ctx.fillStyle = "black";

// Draw the rectangle
ctx.fillRect(xPos, yPos, width, height);
}

function DrawText(text,bold,fontSize,xPos,yPos){
  if(bold){
      ctx.font = `bold ${fontSize}px sans-serif`;
  }else{
    ctx.font = `${fontSize}px sans-serif`;
  }
  ctx.fillText(text, xPos, yPos);
}
function simplified(){
  window.location='./index-simplified.html'
}
function back(){
  window.location='./index.html'
}
