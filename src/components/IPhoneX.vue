<template>
  <div class="device device-spacegray device-iphone-8">
    <div class="device-frame">
      <iframe src="/" frameborder="0" scrolling="no" />
    </div>
    <div class="device-stripe"></div>
    <div class="device-header"></div>
    <div class="device-sensors"></div>
    <div class="device-btns"></div>
    <div class="device-power"></div>
  </div>
</template>

<script>
export default {
  name: "IPhoneX",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.device {
  margin: 0 auto;
}

iframe {
  position: absolute;
  width: 375px;
  height: 675px;
  top: 95px;
}

/*! Devices.css v0.1.16 | MIT License | github.com/picturepan2/devices.css */
.device,
.device::before,
.device::after,
.device *,
.device *::before,
.device *::after {
  box-sizing: border-box;
  display: block;
}

.device {
  position: relative;
  transform: scale(1);
  z-index: 1;
}

.device .device-frame {
  z-index: 1;
}

.device .device-content {
  background-color: #fff;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  position: relative;
}

.device-iphone-x {
  height: 868px;
  width: 428px;
}

.device-iphone-x .device-frame {
  background: #222;
  border-radius: 68px;
  box-shadow: inset 0 0 2px 2px #c8cacb, inset 0 0 0 7px #e2e3e4;
  height: 868px;
  padding: 28px;
  width: 428px;
}

.device-iphone-x .device-content {
  border-radius: 40px;
  height: 812px;
  width: 375px;
}

.device-iphone-x .device-stripe::after,
.device-iphone-x .device-stripe::before {
  border: solid rgba(51, 51, 51, 0.25);
  border-width: 0 7px;
  content: "";
  height: 7px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 9;
}

.device-iphone-x .device-stripe::after {
  top: 85px;
}

.device-iphone-x .device-stripe::before {
  bottom: 85px;
}

.device-iphone-x .device-header {
  background: #222;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 30px;
  left: 50%;
  margin-left: -102px;
  position: absolute;
  top: 28px;
  width: 204px;
}

.device-iphone-x .device-header::after,
.device-iphone-x .device-header::before {
  content: "";
  height: 10px;
  position: absolute;
  top: 0;
  width: 10px;
}

.device-iphone-x .device-header::after {
  background: radial-gradient(
    circle at bottom left,
    transparent 0,
    transparent 75%,
    #222 75%,
    #222 100%
  );
  left: -10px;
}

.device-iphone-x .device-header::before {
  background: radial-gradient(
    circle at bottom right,
    transparent 0,
    transparent 75%,
    #222 75%,
    #222 100%
  );
  right: -10px;
}

.device-iphone-x .device-sensors::after,
.device-iphone-x .device-sensors::before {
  content: "";
  position: absolute;
}

.device-iphone-x .device-sensors::after {
  background: #444;
  border-radius: 3px;
  height: 6px;
  left: 50%;
  margin-left: -25px;
  top: 32px;
  width: 50px;
}

.device-iphone-x .device-sensors::before {
  background: #444;
  border-radius: 50%;
  height: 14px;
  left: 50%;
  margin-left: 40px;
  top: 28px;
  width: 14px;
}

.device-iphone-x .device-btns {
  background: #c8cacb;
  height: 32px;
  left: -3px;
  position: absolute;
  top: 115px;
  width: 3px;
}

.device-iphone-x .device-btns::after,
.device-iphone-x .device-btns::before {
  background: #c8cacb;
  content: "";
  height: 62px;
  left: 0;
  position: absolute;
  width: 3px;
}

.device-iphone-x .device-btns::after {
  top: 60px;
}

.device-iphone-x .device-btns::before {
  top: 140px;
}

.device-iphone-x .device-power {
  background: #c8cacb;
  height: 100px;
  position: absolute;
  right: -3px;
  top: 200px;
  width: 3px;
}

.device-iphone-8 {
  height: 871px;
  width: 419px;
}

.device-iphone-8 .device-frame {
  background: #fff;
  border-radius: 68px;
  box-shadow: inset 0 0 0 2px #c8cacb, inset 0 0 0 7px #e2e3e4;
  height: 871px;
  padding: 102px 22px;
  width: 419px;
}

.device-iphone-8 .device-content {
  border: 2px solid #222;
  border-radius: 4px;
  height: 667px;
  width: 375px;
}

.device-iphone-8 .device-stripe::after,
.device-iphone-8 .device-stripe::before {
  border: solid rgba(51, 51, 51, 0.15);
  border-width: 0 7px;
  content: "";
  height: 6px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 9;
}

.device-iphone-8 .device-stripe::after {
  top: 68px;
}

.device-iphone-8 .device-stripe::before {
  bottom: 68px;
}

.device-iphone-8 .device-header {
  border: 2px solid #c8cacb;
  border-radius: 50%;
  bottom: 25px;
  height: 58px;
  left: 50%;
  margin-left: -29px;
  position: absolute;
  width: 58px;
}

.device-iphone-8 .device-sensors {
  background: #666;
  border-radius: 3px;
  height: 6px;
  left: 50%;
  margin-left: -38px;
  position: absolute;
  top: 52px;
  width: 76px;
}

.device-iphone-8 .device-sensors::after,
.device-iphone-8 .device-sensors::before {
  background: #666;
  border-radius: 50%;
  content: "";
  position: absolute;
}

.device-iphone-8 .device-sensors::after {
  height: 10px;
  left: 50%;
  margin-left: -5px;
  top: -25px;
  width: 10px;
}

.device-iphone-8 .device-sensors::before {
  height: 12px;
  left: -42px;
  margin-top: -6px;
  top: 50%;
  width: 12px;
}

.device-iphone-8 .device-btns {
  background: #c8cacb;
  height: 30px;
  left: -3px;
  position: absolute;
  top: 102px;
  width: 3px;
}

.device-iphone-8 .device-btns::after,
.device-iphone-8 .device-btns::before {
  background: #c8cacb;
  content: "";
  height: 56px;
  left: 0;
  position: absolute;
  width: 3px;
}

.device-iphone-8 .device-btns::after {
  top: 62px;
}

.device-iphone-8 .device-btns::before {
  top: 132px;
}

.device-iphone-8 .device-power {
  background: #c8cacb;
  height: 80px;
  position: absolute;
  right: -2px;
  top: 160px;
  width: 3px;
}

.device-iphone-8.device-gold .device-frame {
  box-shadow: inset 0 0 0 2px #e4b08a, inset 0 0 0 7px #f7e8dd;
}

.device-iphone-8.device-gold .device-header {
  border-color: #e4b08a;
}

.device-iphone-8.device-gold .device-btns,
.device-iphone-8.device-gold .device-btns::after,
.device-iphone-8.device-gold .device-btns::before {
  background: #e4b08a;
}

.device-iphone-8.device-gold .device-power {
  background: #e4b08a;
}

.device-iphone-8.device-spacegray .device-frame {
  background: #222;
  box-shadow: inset 0 0 0 2px #74747a, inset 0 0 0 7px #9b9ba0;
}

.device-iphone-8.device-spacegray .device-stripe::after,
.device-iphone-8.device-spacegray .device-stripe::before {
  border-color: rgba(204, 204, 204, 0.35);
}

.device-iphone-8.device-spacegray .device-btns,
.device-iphone-8.device-spacegray .device-btns::after,
.device-iphone-8.device-spacegray .device-btns::before {
  background: #74747a;
}
</style>
