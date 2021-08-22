prediction_1="";
prediction_2="";
Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 100
  });
  camera=document.getElementById("camera");
  
  Webcam.attach('#camera');

  function take_snapshot()
  {
    Webcam.snap(function(data_uri)
    {
      document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

        });
  }
  console.log('ml5 version', ml5.version);

  classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rtsldXSp4/model.json', modelLoaded);
  function modelLoaded()
  {
      console.log('modelIsLoaded');
      
  }
  function speak()
  {
      var Harry=window.speechSynthesis;
      p1="The First Prediction is"+prediction_1;
      p2="and The second Prediction is"+prediction_2;
      var utter=new SpeechSynthesisUtterance(p1+p2);
      Harry.speak(utter);

  }
  function check()
  {
    img=document.getElementById('captured_image');
    classifier.classify(img, gotresult)//classifier mane comparing images with teachable and visul//



  }
  function gotresult(error, results)
  {
    if(error) 
    {
      console.error(error);
    }
    else
    {
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML=results[0].label;
      document.getElementById("result_emotion_name2").innerHTML=results[1].label;
      prediction_1=results[0].label;
      prediction_2=results[1].label;
      speak();
      if(results[0].label=="Nice")
      {
        document.getElementById("update_emoji").innerHTML="👌";
      }
      if(results[0].label=="Thumbs Up")
      {
        document.getElementById("update_emoji").innerHTML="👍";
      }
      if(results[0].label=="Victory")
      {
        document.getElementById("update_emoji").innerHTML="✌";
      }
      if(results[0].label=="Punch")
      {
        document.getElementById("update_emoji").innerHTML="✊";
      }
      if(results[0].label=="Clap")
      {
        document.getElementById("update_emoji").innerHTML="👏";
      }
      if(results[0].label=="Swag")
      {
        document.getElementById("update_emoji").innerHTML="🤘";
      }
    }
  }