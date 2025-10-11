## 30 Sept 25

- Initialised folder structure.
- Added photos of the two landmarks using ICrawler.
- Watched a video on transfer learning using TensorFlow + mobilenetv2 from code basics.
- setup the transfer learning in training-model.py file using tensor flow

## 1 Oct 25

- Continued working through traning-model.py transfer learning
- currently getting typeerror problem:

```bash
  Traceback (most recent call last):
  File "c:\Users\ashut\Desktop\KTMVTour\ml-model\models\training-model.py", line 149, in <module>
  model = tf.keras.Sequential([
  ^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\ashut\Desktop\KTMVTour\ml-model\venv\Lib\site-packages\keras\src\models\sequential.py", line 75, in **init**
  self.add(layer, rebuild=False)
  File "C:\Users\ashut\Desktop\KTMVTour\ml-model\venv\Lib\site-packages\keras\src\models\sequential.py", line 97, in add
  raise ValueError(
  ValueError: Only instances of `keras.Layer` can be added to a Sequential model. Received: <tensorflow_hub.keras_layer.KerasLayer object at 0x000001E2F98C0F10> (of type <class 'tensorflow_hub.keras_layer. KerasLayer'>)
```

- I wrote about how I solved it here on github (https://github.com/tensorflow/tensorflow/issues/63849#issuecomment-3354405639):
  ![alt text](./images-for-log/image.png)

- Btw the lambda layer wraps a function and does not declare its input shape. Previously our hub.KerasLayer declared the input shape, so TensorFlow could build model right away.
  but with lamda, we need to tell the model what kind of input shape its taking by just declaring it like this: tf.keras.layers.InputLayer(input_shape=(img_height,img_width, 3)), e.g (224,224,3)

- Completed model training:
  ![alt text](./images-for-log/image2.png)
  ![alt text](./images-for-log/image3.png)

-Exported model, now starting to test the model.

-when testing the model it turns out that since i used lambda to resolve the sequential access problem i have to import the mnodel using safe_mode=false.

- That's fine, I did that, but then boom run into another error saying:

```bash
Traceback (most recent call last):
  File "c:\Users\ashut\Desktop\KTMVTour\ml-model\models\testing-model.py", line 26, in <module>
    predictions = myModel.predict(img)
                  ^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\ashut\Desktop\KTMVTour\ml-model\venv\Lib\site-packages\keras\src\utils\traceback_utils.py", line 122, in error_handler
    raise e.with_traceback(filtered_tb) from None
  File "c:/Users/ashut/Desktop/KTMVTour/ml-model/models/training-model.py", line 153, in <lambda>
    # Keras Sequential API is a way to build your neural network by lining up layers in order, like a stack of Lego blocks.
                                       ^^^^^^^^^^^^^^^^^^^^^^^
NameError: Exception encountered when calling Lambda.call().

name 'feature_extractor_layer' is not defined

Arguments received by Lambda.call():
  • inputs=tf.Tensor(shape=(1, 224, 224, 3), dtype=float32)
  • mask=None
  • training=False
```

-now im trying to remove the lambda and get it working again.

- RAHH Finally solved error using this peice:

```bash
version_fn = getattr(tf.keras, "version", None)
if version_fn and version_fn().startswith("3."):
  import tf_keras as keras
else:
  keras = tf.keras
```

- I did see this before & try it but I didn't change all my tf.keras imports to keras thats why it wasn't working.
- I loaded up a simple test script from grok as a sample & it worked:

  ![alt text](./images-for-log/image4.png)

- Ok right, damn when doing testing even if I put a pic of my face it's still guessing between the two landmarks, boudha-stupa & dharahara.
- I need to get the accuracy on this thing up. faaaaking hell yeah i gotta get like 700 images each for 2 landmarks & they have to be realistic.
- Ok im only doing this project for 2 landmarks boudha-stupa & dharahara, and i need to add a class called no-landmark & add maybe like 2k images
- of just random shit so model can differentiate between landmark and other bullshit.

## 1 Oct 25

- got to 200 images for boudha-stupa for now
- removed ICrawler scripts + photos

## 2 Oct 25

- Spent the day grabbing some more photos of landmark.

## 3 Oct 25

- for now the plan is to get some more photos. Maybe if I can get 400 photos by end of today & then use data augmentation.
- maybe start on the frontend aswell?
- creating home page layout/design using figma.
- Initialised expo project

## 4 Oct 25

- plan for today is to continue grabbing images for dataset & also get some sections of the frontend styling on app complete.
- Following along with this tutorial to get an idea of how native works + some tips: https://www.youtube.com/watch?v=f8Z9JyB2EIE

## 5 Oct 25

- continued grabbing some more images + working on site home

## 6 Oct 25

- I didn't even grab any images today, I basically got 500 for first landmark, may just use data augmentation to make total like 800.
- Spent some time doing my other assignment today + been learning dsa + git workflows + aws these past couple of days.
- regardless, the frontend styling for home page isn't even gonna take long so it's fine. I may also just start on the backend on node aswell soon.
- after i finish training my model & importing the AR part, project is just about making use of location APIs, from there it's just basic crud APIs.
- not much significant errors encountered so far on react native, guess it's basically same as react tho that's why. Just syntax confusion.

## 7 Oct 25

- Filtered out useless images from second landmark folder
- Plan for today is to grab images of second landmark & get some frontend done + setup backend folders.
- I'll also dive into what db I should use, mongo should do but lets see.

- Ok i ran into sort of a positioning issue, I was trying to use absolute positioning like this on my icon:

```TypeScript
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute top-[20%] left-[10%] animate-pulse"
          />
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute bottom-[10%] left-[15%] animate-pulse"
          />
          <MapPin
            size={24}
            color={"#8B5CF6"}
            className="absolute top-[10%] right-[10%] animate-pulse"
          />
```

instead needded to do it like this:

```TypeScript
          <View className="flex flex-col items-center justify-center">
            <Map size={60} color={"#8B5CF6"}/>
            <Text className="text-secondary animate-pulse">
              Interactive map loading...
            </Text>
          </View>
          <View className="absolute top-12 left-12 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
          <View className="absolute bottom-12 left-8 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
          <View className="absolute top-8 right-8 animate-pulse">
            <MapPin size={24} color={"#8B5CF6"} />
          </View>
```
- didn't get any images of second landmark today, and just completed half the card.
- need to speed this up. Gotta get a lot more done tomorrow. Only 1 leetcode tomorrow morning & just focus on dataset + frontend.


## 8 OCT 25

- Got Database setup on mongo, gathered only like 20 no landmark images.
- look into anomaly detection tomorrow, somehow maybe I can avoid having to fetch 2k images. Link for a video: https://www.youtube.com/watch?v=2K3ScZp1dXQ
- backend is ready to go now, initial files setup controllers ready to be made.
- spent a while on devinterview.io today skimming through 10 js & 10 ts questions. I'll aim to do 10 a day if I can..
- also got more of the frontend home page styling setup aswell

## 9 OCT 25

- Did the posts section. Had a bit of trouble with overflowing issue because of one h-screen element on parent View tag.
- No images collected.

## 10 OCT 25

- Created the share your experience card styling.
- Grabbed 100 images. Plan from today is to grab 100 images everyday & then in 20 days i'll be done grabbing 2k images for no landmark class.
- Shoudln't be hard to get 100 images of random things a day.
- Also set up a very basic register function with no password hashing.


## 11 OCT 25

- just writing some errors i encountered while doing the backend:

- forgot to use:

```TypeScript
app.use(express.json()); //used to parse incoming requests with Content-Type: application/json
app.use(express.urlencoded({ extended: true })); //used to parse application/x-www-form-urlencoded data
```


## 12 OCT 25

- got 100 images today of no landmark class
- setup login function boilerplate