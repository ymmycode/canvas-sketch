<template>

  <!-- <vue-drawing-canvas 
      ref="VueCanvasDrawing" 
      :width="canvasProp.width"
      :height="canvasProp.height"
      :styles="{
        border: 'solid 1px #000',
      }"
    /> -->

  <div class="fixed">
    <vue-drawing-canvas
      ref="VueCanvasDrawing"
      class="shadow-lg"
      v-model:image="image"
      :width="canvasProp.width"
      :height="canvasProp.height"
      :stroke-type="strokeType"
      :line-cap="lineCap"
      :line-join="lineJoin"
      :fill-shape="fillShape"
      :eraser="eraser"
      :lineWidth="line"
      :color="color"
      :background-color="backgroundColor"
      :background-image="backgroundImage"
      :watermark="watermark"
      :initial-image="initialImage"
      saveAs="png"
      :lock="disabled"
      @mousemove="getCoordinate($event)"
      :additional-images="additionalImages"
    />
  </div>

  <div class="fixed w-full h-full z-10 pointer-events-none unselectable">
    <img class="w-full h-full pointer-events-none unselectable" src="../assets/body_trans.png" alt="">
  </div>

  <div :class="minimize ? 'overflow-hidden' : ''" class="text-xs fixed bottom-10 left-1/2 -translate-x-1/2 border shadow-lg z-40 bg-white rounded-xl">
    <div @click="minimize = !minimize" class="unselectable button-container rounded-t-xl bg-slate-200 cursor-pointer w-full border py-[.5vw] px-[2vw] flex justify-between items-center">
      <div class="text-[1vw] font-bold">
        Control
      </div>
      <div class="p-[.2vw]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.2vw] h-[1.2vw]" :class="minimize ? 'rotate-180' : 'rotate-0'" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 328l144-144l144 144"/></svg>
      </div>
    </div>

    <div class="w-full transition-all duration-300 unselectable" :class="minimize ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'">
      <!-- Lock & Unlock canvas -->
      <div class="button-container">
        <button type="button" @click.prevent="disabled = !disabled" class="button-menu-small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-lock"
            viewBox="0 0 16 16"
          >
            <path
              v-if="!disabled"
              d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
            />
            <path
              v-else
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
            />
          </svg>
          <span v-if="!disabled">Unlock</span>
          <span v-else>Lock</span>
        </button>

        <!-- Undo Sketch -->
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.undo()" class="button-menu-small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
            />
          </svg>
          Undo
        </button>


        <!-- Redo Sketch -->
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.redo()" class="button-menu-small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path
              d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
            />
          </svg>
          Redo
        </button>

        <!-- Refresh / Redraw Sketch -->
        <button
          type="button"
          @click.prevent="$refs.VueCanvasDrawing.redraw()"
          class="button-menu-small"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-repeat"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
            />
            <path
              fill-rule="evenodd"
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
            />
          </svg>
          Refresh
        </button>

        <!-- Reset / Restart Canvas -->
        <button type="button" @click.prevent="$refs.VueCanvasDrawing.reset()" class="button-menu-small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-file-earmark"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
            />
          </svg>
          Reset
        </button>
      </div>

      <div class="button-container flex">

        <!-- Erase & Draw -->
        <button type="button" @click.prevent="eraser = !eraser" class="button-menu">
          <div class="flex h-full">
            <div :class="eraser? '':'bg-slate-200'" class="w-full h-full hover:bg-slate-200 transition-colors duration-200 p-[.5vw] flex items-center">
              <span>
                <svg 
                  class="w-[2vw] h-[2vw]" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
                    <path fill="currentColor" d="m22.017 3.874l-.59 1.581a250.264 250.264 0 0 1-.732 1.697c-.678 1.455-1.612 3.156-2.727 4.33c-1.066 1.12-2.674 2.153-3.962 2.886a4.996 4.996 0 0 1-1.36 4.557c-2.27 2.27-4.806 2.27-6.692 1.71c-1.43-.426-2.606-1.198-3.73-2.148a.394.394 0 0 1 .027-.624l.5-.362c.672-.507 1.325-1.126 1.49-1.955c.115-.925.18-1.43.197-1.513c.138-.689.43-1.471 1.138-2.18a4.996 4.996 0 0 1 4.556-1.36c.733-1.287 1.766-2.895 2.886-3.96c1.174-1.116 2.875-2.05 4.33-2.728l1.697-.733l1.581-.589a1.094 1.094 0 0 1 1.391 1.39ZM11.98 11.293a5.041 5.041 0 0 1 1.227 1.228c.392-.227.795-.473 1.19-.732l-.03-.067a3.312 3.312 0 0 0-.66-.93a3.354 3.354 0 0 0-.817-.603l-.179-.086c-.259.395-.505.798-.732 1.19Zm7.442-6.215c-.383.159-.8.34-1.23.54c-1.408.657-2.866 1.48-3.796 2.364a7.63 7.63 0 0 0-.47.493c.362.2.782.49 1.195.904c.414.413.704.833.904 1.195c.178-.156.344-.313.493-.47c.884-.93 1.707-2.388 2.364-3.797c.2-.43.381-.846.54-1.229Z"/>
                  </g>
                </svg>
                Draw
              </span>
            </div>
            <div :class="eraser? 'bg-slate-200':''" class="w-full h-full hover:bg-slate-200 transition-colors duration-200 p-[.5vw] flex items-center">
              <span>
                  <svg
                    class="w-[2vw] h-[2vw]" 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="m8.464 7.05l8.486 8.486L13.485 19H20a1 1 0 1 1 0 2H8.893a1.5 1.5 0 0 1-1.06-.44l-5.026-5.024a2 2 0 0 1 0-2.829L8.464 7.05Zm7.071-4.242l5.657 5.656a2 2 0 0 1 0 2.829l-2.828 2.828l-8.485-8.485l2.828-2.828a2 2 0 0 1 2.828 0Z"/>
                    </g>
                  </svg>
                  Eraser
              </span>
            </div>
          </div>
        </button>

        <!-- Brush Size -->
        <div class="w-auto flex items-center gap-[1vw] button-menu p-[.5vw]">
          <VueSlider
            ref="slider"
            id="lineSize"
            v-model="line"
            v-bind="options"
          ></VueSlider>
          <input type="number" min="1" for="lineSize" v-model="line" class="border w-[1.5vw] p-[.1vw]">
        </div>

        <!-- Color Picker -->
        <div class="p-[.5vw] border">
          <div class="flex items-center flex-col">
            <pick-colors theme="dark" id="colorPicker" v-model:value="color"/>
            <div>Pick&nbsp;Color</div>
          </div>
        </div>

        <!-- stoke & fill shape -->
        <div id="drawType" class="button-menu flex items-center p-[.5vw]">
          <div>
            <select v-model="strokeType" class="border mb-[1vw]">
              <option value="dash">Dash</option>
              <option value="line">Straight Line</option>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
              <option value="half_triangle">Half Triangle</option>
            </select>
            <div>Draw & Shapes</div>
          </div>
        </div>

        <!-- fill & stroke -->
        <button type="button" @click.prevent="fillShape = !fillShape" class="button-menu p-[.5vw]">
          <div v-if="fillShape" class="flex items-center gap-[.5vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[2vw] h-[2vw]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"
              />
            </svg>
            Fill&nbsp;Shape
          </div>
          <div v-else class="flex items-center gap-[.5vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[2vw] h-[2vw]"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
            </svg>
            Stroke&nbsp;Shape
          </div>
        </button>
      
      </div>

      <div class="w-full flex justify-end">
        <div class="button-container">
          <!-- Save & Send Image -->
          <button class="button-menu hover:bg-slate-200 flex gap-[.5vw] py-[.5vw] px-[1vw]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M8 3v3.5A1.5 1.5 0 0 0 9.5 8h4A1.5 1.5 0 0 0 15 6.5V3h.586A2 2 0 0 1 17 3.586L19.414 6A2 2 0 0 1 20 7.414V19a2 2 0 0 1-2 2h-2v-7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v7H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3Zm6 11v7H9v-7h5ZM13 3v3h-3V3h3Z"/></g></svg>
            Save & Send Image
          </button>
        </div>
      </div>
    </div>

    <!-- <div class="button-container">

      Save Stroke
      <button type="button" @click.prevent="getStrokes()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-image-alt"
          viewBox="0 0 16 16"
        >
          <path
            d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z"
          />
        </svg>
        Save All Strokes
      </button>

      Remove Stroke
      <button type="button" @click.prevent="removeSavedStrokes()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-eraser"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
          />
        </svg>
        Remove Saved Strokes
      </button>
    </div> -->

    <!-- <div class="button-container">
      <div style="margin-right: 30px">
        <p style="margin-bottom: 0">Background Color:</p>
        <input type="color" v-model="backgroundColor" />
      </div>
      <div>
        <p style="margin-bottom: 0">Upload Background Image:</p>
        <input type="file" @change="setImage($event)" />
      </div>
      <div>
        <p style="margin-bottom: 0">Upload Watermark Image:</p>
        <input type="file" @change="setWatermarkImage($event)" />
      </div>
    </div> -->
  </div>

  <div class="fixed top-0 left-0 z-50 max-w-2xl">
    <video id="vid" controls autoplay class="w-full h-full absolute top-0 left-0"></video>
    <figure class="relative left-0 top-0 z-20 w-full h-full">
      <img src="../assets/body_trans.png" alt="">
    </figure>
  </div>

</template>

<script setup>
import VueDrawingCanvas from 'vue-drawing-canvas'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

import PickColors from 'vue-pick-colors'

import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useMainStore } from '../store'
import { useRouter } from "vue-router";

// image
import ImageFill from '../assets/body_fill.png'
import ImageTrans from '../assets/body_trans.png'

const store = useMainStore()
const route = useRouter();
const openDrawBoard = () => {
  // store.captureCanvasStream(document.getElementById('VueDrawingCanvas').captureStream(60))
  let routeData = route.resolve({ name: "canvas-stream" });
  let newWindow = window.open(
    routeData.href,
    "foobar",
    "toolbar=no,scrollbars=no,resizable=yes,top=0,left=1920,width=4000,height=4000,fullscreen=yes"
  );
};
const start = () => {
  openDrawBoard();
  route.push({ name: "drawboard" });
};

const initialImage = ref([
  {
    type: "dash",
    from: {
      x: 262,
      y: 154,
    },
    coordinates: [],
    color: "#000000",
    width: 5,
    fill: false,
  },
])
const x = ref(0)
const y = ref(0)
const image = ref("")
const eraser = ref(false)
const disabled = ref(false)
const fillShape = ref(false)
const color = ref("#000000")
const strokeType = ref("dash")
const lineCap = ref("round")
const lineJoin = ref("round")
const backgroundColor = ref("#FFFFFF")
const backgroundImage = ref(null)
const watermark = ref(null)
const additionalImages = ref([])
const VueCanvasDrawing = ref()
const minimize = ref(false)

const line = ref(5)
const options = ref({
  dotSize: 14,
  width: '6vw',
  height: 4,
  contained: false,
  direction: 'ltr',
	data: null,
  dataLabel: 'label',
  dataValue: 'value',
  min: 1,
  max: 50,
  interval: 1,
  disabled: false,
  clickable: true,
  duration: 0.5,
  adsorb: false,
  lazy: false,
  tooltip: 'active',
  tooltipPlacement: 'top',
  tooltipFormatter: void 0,
  useKeyboard: false,
  keydownHook: null,
  dragOnClick: false,
  enableCross: true,
  fixed: false,
  minRange: void 0,
  maxRange: void 0,
  order: true,
  marks: false,
  dotOptions: void 0,
  dotAttrs: void 0,
  process: true,
  dotStyle: void 0,
  railStyle: void 0,
  processStyle: void 0,
  tooltipStyle: void 0,
  stepStyle: void 0,
  stepActiveStyle: void 0,
  labelStyle: void 0,
  labelActiveStyle: void 0,
})

const canvasProp = ref({
  width: window.innerWidth,
  height: window.innerHeight
})

const setImage = (event) => {
  let URL = window.URL;
  fetch(ImageFill)
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    backgroundImage.value = url;
    VueCanvasDrawing.value.redraw();
  });
}

const setWatermarkImage = (event) => {
  let URL = window.URL;
  fetch(ImageTrans)
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    watermark.value = {
      type: "Image",
      source: url,
      x: 0,
      y: 0,
      imageStyle: {
        // width: canvasProp.value.width,
        // height: canvasProp.value.height,

        width: 1920,
        height: 1080,
      },
    };
    VueCanvasDrawing.value.redraw();
  });
}

const getCoordinate = (event) => {
  let coordinates = VueCanvasDrawing.value.getCoordinates(event);
  x.value = coordinates.x;
  y.value = coordinates.y;
}

const getStrokes = () => {
  window.localStorage.setItem(
    "vue-drawing-canvas",
    JSON.stringify(VueCanvasDrawing.value.getAllStrokes())
  );
  alert(
    "Strokes saved, reload your browser to see the canvas with previously saved image"
  );
}

const removeSavedStrokes = () => {
  window.localStorage.removeItem("vue-drawing-canvas");
  alert("Strokes cleared from local storage");
}

onMounted(() => {
  
  if ("vue-drawing-canvas" in window.localStorage) {
    initialImage.value = JSON.parse(
      window.localStorage.getItem("vue-drawing-canvas")
    );
  }

  // canvasProp.value.width = window.innerWidth
  // canvasProp.value.height = window.innerHeight

  window.addEventListener("resize", () => {
    // console.log(window.innerWidth, window.innerHeight)
    canvasProp.value.width = window.innerWidth
    canvasProp.value.height = window.innerHeight
    VueCanvasDrawing.value.redraw()
  })
  

  nextTick(() => {
    // console.log(store.count)
    setImage()
    setWatermarkImage()

    let vidEl = document.getElementById('vid')
    let stream = document.getElementById('VueDrawingCanvas').captureStream(60)
    vidEl.srcObject = stream
    // vidEl.play()
  })

  // start()

})

// watch(
//   () => image.value,
//   (val) => {
//     console.log(val)
//   }
// )
</script>

<style lang="scss" scoped>

</style>