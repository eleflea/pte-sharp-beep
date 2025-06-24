// ==UserScript==
// @name         PTE RS播放结束后的巨大哔声
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在PTE练习网站的RS播放结束后，模拟播放正式考试中的巨大哔声
// @author       eleflea
// @match        https://www.ptexj.com/practice/repeat_sentences/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ptexj.com
// @downloadURL  https://raw.githubusercontent.com/eleflea/pte-sharp-bleep/main/pte-sharp-bleep.user.js
// @updateURL    https://raw.githubusercontent.com/eleflea/pte-sharp-bleep/main/pte-sharp-bleep.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";
  // 只会绑定一个Audio
  let hasFound = false;
  const beepAudioBase64 =
    "data:audio/mpeg;base64,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SD3++ghkxjgzU+6aXLAyd2vjATWbRICzfvN4901F5NO14YdzVyPw3MXfzYAHqhB+eEPn2/ef/1oF24lFaJAcNmw/PV/czmu3uZnvo5GO6LTX/Tj0P+la+v9oAwAAAP/7UmR+ADIENltp+TuMFwGLnhhtRQgA2XekvK4wVQYrIGHgbQBEDDlOIEMstVi5DQXDV/pFm0gADGocoBMZFG8VsGIxMMaDNPlmRz1yhpfIjuHXqqBPrTXTM+9WbfUCPFhAcUguJJVzNPlEwA7+oKAZ1e7WyZb0NAVf0AAACRpti0QiMm4spqhHJH58YriPy1VHaIZlATk0kbAK+gmgXh3LRfjmVpfEUgJKnYbh7pKxAwX4Eyz3Vlj7us2ZaAXQkRKjUYLHismxvR8frXfTnKlz//tSZH4AEj013GspFEwXoYttGHAbCJSBXaforkBdBitgYeBso6W9/P+qG1DH/t9eM6dBVMAAAGHLY45I1aCQry4QhAu9oauu/tQCbcbQAUG0Z8hD4WPjBIH0asgwSQjMwS4OgeCG631KamyCGmSBkBB0fmPAPL51/yIRj+AF8VT4Y+3X+p+jYBZXSdHO7vM19XCHoiHwSYZ0Q2P/ardbJYAG2224xHJJWKAFMhOLQaljHWpWH4G4Alwie/QmobvikIoYArMUGZY4yRJIseikpdT/+1JkdoAydUDeefI7jBRBeuggOSlH9Fd7tJaAOFiGKxaS8ABYS5cKitLUlSRapzQvmJz9anRpJsmXDh11WUqitXz9Nb3XW2tfUktFkq2uzOh//6KKSlmG3uG3AJAQDAloElslAB7ksq43wdaRc8fkCN1xTzMGay9nf+df/ZyI3/02QzJoXUxv/9deh6mBg2AE6JVw6LCGFSIOdfrcSBWaSIyAAMAD2ZmZiwEmZmZmuiRLTQUAgEAgIBAIKJJHeFBT/xBQUFN8aJv/qACA/qknIv/7UmRwgAM9TWDuPaAERiasDceIAIU8Q0vcgwAIgIYo74yQBInAoBIzjVVWqKQqKSUFQWBoGn/lQVBWuAArRAAckYBC31KF2YqLahdmKt8VrFfFBaoWZ/9Tf6xQSAAELCwsLMrFUAUVIu/rFRbFhcViorVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//tSZEsP8QYAu+ghGAgWoBaiBCMAAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";

  // 创建 beep 播放器
  const beepAudio = new Audio(beepAudioBase64);

  const STORAGE_KEY = "tampermonkey-RS-bleep-audio-gain";
  const DEFAULT_GAIN = 1.0;

  // 从 localStorage 加载保存的增益值
  const savedGain =
    parseFloat(localStorage.getItem(STORAGE_KEY)) || DEFAULT_GAIN;

  // 创建 AudioContext 和 GainNode
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = savedGain;
  const source = audioCtx.createMediaElementSource(beepAudio);
  source.connect(gainNode).connect(audioCtx.destination);

  // 插入控制面板
  const panel = document.createElement("div");
  panel.style.position = "fixed";
  panel.style.bottom = "12px";
  panel.style.fontSize = "12px";
  panel.style.right = "12px";
  panel.style.background = "rgba(0,0,0,0.7)";
  panel.style.padding = "6px";
  panel.style.borderRadius = "4px";
  panel.style.color = "white";
  panel.style.zIndex = 9999;
  panel.innerHTML = `
    <label for="gainSlider">哔声增益(小心调节): <span id="gainValue">${savedGain.toFixed(
      1
    )}</span></label><br>
    <input type="range" id="gainSlider" min="0.0" max="5.0" value="${savedGain}" step="0.1" style="width: 120px;">
  `;
  document.body.appendChild(panel);

  // 滑块控制逻辑
  const gainSlider = document.getElementById("gainSlider");
  const gainValue = document.getElementById("gainValue");
  gainSlider.addEventListener("input", () => {
    const val = parseFloat(gainSlider.value);
    gainNode.gain.value = val;
    gainValue.textContent = val.toFixed(1);
    localStorage.setItem(STORAGE_KEY, val);
  });

  // 观察 DOM 中添加的 audio 元素（包括动态加载的）
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1 && node.tagName.toLowerCase() === "audio") {
          attachEndedListener(node);
        } else if (node.nodeType === 1) {
          // 若有嵌套 audio 元素
          const audios = node.querySelectorAll("audio");
          audios.forEach(attachEndedListener);
        }
      }
    }
  });

  // 附加 ended 事件处理器
  function attachEndedListener(audio) {
    if (audio.parentElement.tagName !== "BODY") return;
    if (hasFound) return; // 避免重复绑定
    hasFound = true;

    audio.addEventListener("ended", () => {
      console.log("开始播放哔");
      beepAudio.currentTime = 0;
      beepAudio.volume = 1;
      beepAudio.play().catch((e) => {
        console.warn("播放哔声失败:", e);
      });
    });
  }

  // 初始页面已有的 audio 元素
  document.querySelectorAll("audio").forEach(attachEndedListener);

  // 开始监听 DOM 变化
  observer.observe(document.body, { childList: true, subtree: true });

  // 必须在用户交互后恢复音频上下文（浏览器策略限制）
  window.addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  });
})();
