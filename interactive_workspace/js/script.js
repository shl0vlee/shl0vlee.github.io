
document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================================
     [INDEX: SCENE 1] 오프닝 화면 인터랙션
     ======================================================================== */

  const scene1 = document.getElementById('scene1');
  const titleLayer = document.querySelector('.title-layer');
  const characterLayer = document.getElementById('openingCharacter');
  const bottomCaption = document.querySelector('.bottom-caption-wrapper');
  const captionText = document.getElementById('openingCaption');

  const ZOOM_SCALE = 1.18;
  let isOpeningTriggered = false;
  let initialTopPx = 0;

  if (characterLayer) {
    const rect = characterLayer.getBoundingClientRect();
    initialTopPx = rect.top;
    characterLayer.style.height = `${rect.height}px`;
    characterLayer.style.top = `${initialTopPx}px`;
    characterLayer.style.bottom = 'auto';
    characterLayer.style.transition =
      'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
  }

  function triggerOpening() {
    if (isOpeningTriggered) return;
    isOpeningTriggered = true;

    if (titleLayer) {
      titleLayer.style.opacity = '0';
      titleLayer.style.transform = 'translateY(-12px)';
      titleLayer.style.pointerEvents = 'none';
    }

    if (bottomCaption) {
      bottomCaption.style.opacity = '0';
      bottomCaption.style.pointerEvents = 'none';
    }

    if (characterLayer) {
      characterLayer.style.transform =
        `translateX(-50%) scale(${ZOOM_SCALE})`;
    }
  }

  if (captionText) {
    captionText.addEventListener('click', triggerOpening);
  }


  /* ========================================================================
     [INDEX: SCENE 2 & 3] 성적통지표와 손 -> 구겨진 성적표 & 눈물자국
     ======================================================================== */

  const scene2 = document.getElementById('scene2');
  const reportCardImg = document.getElementById('reportCardImg');
  const reportHandImg = document.getElementById('reportHandImg');
  const crumpledStage = document.getElementById('crumpledStage');
  const tearStainImg = document.getElementById('tearStainImg');


  /* ========================================================================
     [INDEX: SCENE 4] 고민하는 준성이와 생각풍선
     ======================================================================== */

  const scene4 = document.getElementById('scene4');
  const thoughtBubble1 = document.getElementById('thoughtBubble1');
  const thoughtBubble2 = document.getElementById('thoughtBubble2');


  /* ========================================================================
     [INDEX: SCENE 5] 자퇴서와 작성하는 손
     ======================================================================== */

  const scene5 = document.getElementById('scene5');
  const dropoutFormImg = document.getElementById('dropoutFormImg');
  const dropoutHandImg = document.getElementById('dropoutHandImg');


  /* ========================================================================
     [INDEX: SCENE 6] 자퇴 후 좌절한 준성이
     ======================================================================== */

  const scene6 = document.getElementById('scene6');
  const despairJunseongImg = document.getElementById('despairJunseongImg');


  /* ========================================================================
     [INDEX: SCENE 7 & 8] 걸어가는 준성이 -> 베이지색 배경 전환
     ======================================================================== */

  const scene7 = document.getElementById('scene7');
  const walkingBackImg = document.getElementById('walkingBackImg');
  const scene8 = document.getElementById('scene8');


  /* ========================================================================
     [INDEX: SCENE 9] 9등급제와 5등급제 비율 비교
     ======================================================================== */

  const scene9 = document.getElementById('scene9');
  const gradeGridImg = document.getElementById('gradeGridImg');
  const gradeNineImg = document.getElementById('gradeNineImg');
  const gradeFiveImg = document.getElementById('gradeFiveImg');


  /* ========================================================================
     [INDEX: SCENE -] 설문조사 디졸브 인터랙션
     ======================================================================== */

  const sceneSurvey = document.getElementById('sceneSurvey');
  const imgStanding = document.getElementById('imgStanding');
  const imgVeryHigh = document.getElementById('imgVeryHigh');
  const imgSomewhatHigh = document.getElementById('imgSomewhatHigh');
  const imgNeutral = document.getElementById('imgNeutral');

  const statVeryHigh = document.getElementById('statVeryHigh');
  const statSomewhatHigh = document.getElementById('statSomewhatHigh');
  const statNeutral = document.getElementById('statNeutral');


  /* ========================================================================
     [INDEX: MASTER SCROLL] 통합 스크롤 진행률 컨트롤러
     ======================================================================== */

  function handleMasterScroll() {
    const vh = window.innerHeight;


    // =====================================================================
    // 1. [SCENE 1] 오프닝 진행
    // =====================================================================

    if (scene1 && characterLayer) {
      const rect1 = scene1.getBoundingClientRect();
      const scrollable1 = rect1.height - vh;

      if (scrollable1 > 0) {
        const progress1 = Math.min(
          Math.max(-rect1.top / scrollable1, 0),
          1
        );

        if (progress1 > 0.015 && !isOpeningTriggered) {
          triggerOpening();
        }

        if (isOpeningTriggered) {
          const targetTopPx =
            (vh / 2) - (characterLayer.offsetHeight / 2);

          const currentTop =
            initialTopPx + (targetTopPx - initialTopPx) * progress1;

          characterLayer.style.top = `${currentTop}px`;
          characterLayer.style.transform =
            `translateX(-50%) scale(${ZOOM_SCALE})`;
        }
      }
    }


    // =====================================================================
    // 2 & 3. [SCENE 2 -> SCENE 3]
    // 성적표+손 등장 -> 구겨진 성적표 -> 눈물자국
    // =====================================================================

    if (
      scene2 &&
      reportCardImg &&
      reportHandImg &&
      crumpledStage &&
      tearStainImg
    ) {
      const rect2 = scene2.getBoundingClientRect();
      const scrollable2 = rect2.height - vh;

      if (scrollable2 > 0) {
        const rawProgress = (vh - rect2.top) / rect2.height;
        const progress = Math.min(Math.max(rawProgress, 0), 1);

        const morphStep = Math.min(
          Math.max((progress - 0.46) / 0.22, 0),
          1
        );

        const cardIn = Math.min(Math.max(progress / 0.22, 0), 1);
        const cardOffsetY = 30 * (1 - cardIn);

        reportCardImg.style.opacity = cardIn * (1 - morphStep);
        reportCardImg.style.transform =
          `translate(-6%, ${cardOffsetY}px)`;

        const handIn = Math.min(
          Math.max((progress - 0.16) / 0.24, 0),
          1
        );

        const handOffsetX = 40 * (1 - handIn);
        const handOffsetY = 80 * (1 - handIn);

        reportHandImg.style.opacity = handIn * (1 - morphStep);
        reportHandImg.style.transform =
          `translate(${handOffsetX}px, ${handOffsetY}px)`;

        crumpledStage.style.opacity = morphStep;
        crumpledStage.style.transform =
          `translate(-2%, ${8 * (1 - morphStep)}px)`;

        const tearStep = Math.min(
          Math.max((progress - 0.70) / 0.22, 0),
          1
        );

        tearStainImg.style.opacity = tearStep;
        tearStainImg.style.transform =
          `scale(${0.96 + 0.04 * tearStep})`;
      }
    }


    // =====================================================================
    // 4. [SCENE 4] 생각풍선 1 -> 생각풍선 2
    // =====================================================================

    if (scene4 && thoughtBubble1 && thoughtBubble2) {
      const rect4 = scene4.getBoundingClientRect();
      const scrollable4 = rect4.height - vh;

      if (scrollable4 > 0) {
        const progress4 = Math.min(
          Math.max(-rect4.top / scrollable4, 0),
          1
        );

        const b1Step = Math.min(
          Math.max((progress4 - 0.12) / 0.30, 0),
          1
        );

        const b1Scale = 0.95 + 0.05 * b1Step;
        const b1Y = 16 * (1 - b1Step);

        thoughtBubble1.style.opacity = b1Step;
        thoughtBubble1.style.transform =
          `translate(-50%, ${b1Y}px) scale(${b1Scale})`;

        const b2Step = Math.min(
          Math.max((progress4 - 0.48) / 0.30, 0),
          1
        );

        const b2Scale = 0.95 + 0.05 * b2Step;
        const b2Y = 16 * (1 - b2Step);

        thoughtBubble2.style.opacity = b2Step;
        thoughtBubble2.style.transform =
          `translate(-50%, ${b2Y}px) scale(${b2Scale})`;
      }
    }


    // =====================================================================
    // 5. [SCENE 5] 자퇴서 -> 작성하는 손
    // =====================================================================

    if (scene5 && dropoutFormImg && dropoutHandImg) {
      const rect5 = scene5.getBoundingClientRect();
      const scrollable5 = rect5.height - vh;

      if (scrollable5 > 0) {
        const rawProgress5 = (vh - rect5.top) / rect5.height;
        const progress5 = Math.min(Math.max(rawProgress5, 0), 1);

        const formStep = Math.min(
          Math.max(progress5 / 0.36, 0),
          1
        );

        const formOffsetY = 24 * (1 - formStep);

        dropoutFormImg.style.opacity = formStep;
        dropoutFormImg.style.transform =
          `translate(-8%, ${formOffsetY}px)`;

        const handStep5 = Math.min(
          Math.max((progress5 - 0.28) / 0.40, 0),
          1
        );

        const hand5X = 50 * (1 - handStep5);
        const hand5Y = 70 * (1 - handStep5);

        dropoutHandImg.style.opacity = handStep5;
        dropoutHandImg.style.transform =
          `translate(${hand5X}px, ${hand5Y}px)`;
      }
    }


    // =====================================================================
    // 6. [SCENE 6] 자퇴 후 좌절한 준성이
    // =====================================================================

    if (scene6 && despairJunseongImg) {
      const rect6 = scene6.getBoundingClientRect();
      const scrollable6 = rect6.height - vh;

      if (scrollable6 > 0) {
        const rawProgress6 = (vh - rect6.top) / rect6.height;
        const progress6 = Math.min(Math.max(rawProgress6, 0), 1);

        const imgStep6 = Math.min(
          Math.max(progress6 / 0.42, 0),
          1
        );

        const imgY6 = 20 * (1 - imgStep6);

        despairJunseongImg.style.opacity = imgStep6;
        despairJunseongImg.style.transform =
          `translateY(${imgY6}px)`;
      }
    }


    // =====================================================================
    // 7 -> 8. [SCENE 7 -> SCENE 8]
    // 준성이 멀어짐 + 아래에서 위로 베이지 배경 전환
    // =====================================================================

    if (scene7 && walkingBackImg) {
      const rect7 = scene7.getBoundingClientRect();
      const scrollable7 = rect7.height - vh;

      if (scrollable7 > 0) {
        const rawProgress7 = (vh - rect7.top) / rect7.height;
        const progress7 = Math.min(Math.max(rawProgress7, 0), 1);

        const fadeIn7 = Math.min(
          Math.max(progress7 / 0.22, 0),
          1
        );

        const fadeOut7 = Math.min(
          Math.max((progress7 - 0.58) / 0.32, 0),
          1
        );

        const scale7 = 1.18 - (0.28 * progress7);

        walkingBackImg.style.opacity =
          fadeIn7 * (1 - fadeOut7);

        walkingBackImg.style.transform =
          `scale(${scale7})`;

        const wipeStep = Math.min(
          Math.max((progress7 - 0.45) / 0.55, 0),
          1
        );

        const sticky7 = scene7.querySelector('.walking-back-screen');

        if (wipeStep <= 0) {
          scene7.style.background = '#1d2c41';

          if (sticky7) {
            sticky7.style.background = 'transparent';
          }

        } else if (wipeStep >= 1) {
          scene7.style.background = '#dfd3c3';

          if (sticky7) {
            sticky7.style.background = '#dfd3c3';
          }

        } else {
          const solidEnd = -55 + (155 * wipeStep);
          const fadeEnd = solidEnd + 55;

          const grad =
            `linear-gradient(to top, #dfd3c3 ${solidEnd}%, #1d2c41 ${fadeEnd}%)`;

          scene7.style.background = grad;

          if (sticky7) {
            sticky7.style.background = grad;
          }
        }

        if (scene8) {
          scene8.style.backgroundColor = '#dfd3c3';
        }
      }
    }


      

/* =========================================
   [INDEX: SCENE 9] 등급제 비율표 인터랙션
========================================= */

if (scene9 && gradeGridImg && gradeNineImg && gradeFiveImg) {
  const rect9 = scene9.getBoundingClientRect();
  const scrollable9 = rect9.height - vh;

  if (scrollable9 > 0) {
    const progress9 = Math.min(
      Math.max(-rect9.top / scrollable9, 0),
      1
    );

    const clamp01 = (value) =>
      Math.min(Math.max(value, 0), 1);

    const smooth = (value) => {
      const t = clamp01(value);
      return t * t * (3 - 2 * t);
    };

    // 자산표는 처음부터 표시
    gradeGridImg.style.opacity = 1;

    // 9등급제 비율표 처음부터 표시
    gradeNineImg.style.opacity = 1;

    // 5등급제 비율표 등장
    const fiveStep = smooth((progress9 - 0.48) / 0.30);
    gradeFiveImg.style.opacity = clamp01(fiveStep * 5);

    // 그래프 영역 너비
    const stageWidth =
      gradeGridImg.getBoundingClientRect().width;

    // 소제목 위치와 일치
    const nineTargetX = -stageWidth * 0.22;
    const fiveTargetX = stageWidth * 0.22;

    // 9등급제 고정
    const nineX = nineTargetX;

    // 5등급제 이동
    const fiveX =
      nineTargetX +
      (fiveTargetX - nineTargetX) * fiveStep;

    gradeNineImg.style.transform =
      `translateX(calc(-50% + ${nineX}px))`;

    gradeFiveImg.style.transform =
      `translateX(calc(-50% + ${fiveX}px))`;

    // 5등급제 소제목도 그래프와 함께 이동 + 페이드인
    const fiveSubtitle =
      document.querySelector(".grade-subtitle-five");

    if (fiveSubtitle) {
      fiveSubtitle.style.opacity = fiveStep;

      fiveSubtitle.style.transform =
        `translateX(calc(-50% + ${fiveX - fiveTargetX}px))`;
    }
  }
}



    // =====================================================================
    // -. [SCENE -] 설문조사 3단계 디졸브
    // =====================================================================

    if (sceneSurvey && imgStanding) {
      const rectSurvey = sceneSurvey.getBoundingClientRect();
      const scrollableSurvey = rectSurvey.height - vh;

      if (scrollableSurvey > 0) {
        const progress = Math.min(
          Math.max(-rectSurvey.top / scrollableSurvey, 0),
          1
        );

        if (progress < 0.22) {
          const step = progress / 0.22;

          imgStanding.style.opacity = 1 - step;
          imgVeryHigh.style.opacity = step;
          imgSomewhatHigh.style.opacity = 0;
          imgNeutral.style.opacity = 0;

          statVeryHigh.style.opacity = step;
          statSomewhatHigh.style.opacity = 0;
          statNeutral.style.opacity = 0;

        } else if (progress < 0.38) {
          imgStanding.style.opacity = 0;
          imgVeryHigh.style.opacity = 1;
          imgSomewhatHigh.style.opacity = 0;
          imgNeutral.style.opacity = 0;

          statVeryHigh.style.opacity = 1;
          statSomewhatHigh.style.opacity = 0;
          statNeutral.style.opacity = 0;

        } else if (progress < 0.55) {
          const step = (progress - 0.38) / 0.17;

          imgStanding.style.opacity = 0;
          imgVeryHigh.style.opacity = 1 - step;
          imgSomewhatHigh.style.opacity = step;
          imgNeutral.style.opacity = 0;

          statVeryHigh.style.opacity = 1 - step;
          statSomewhatHigh.style.opacity = step;
          statNeutral.style.opacity = 0;

        } else if (progress < 0.72) {
          imgStanding.style.opacity = 0;
          imgVeryHigh.style.opacity = 0;
          imgSomewhatHigh.style.opacity = 1;
          imgNeutral.style.opacity = 0;

          statVeryHigh.style.opacity = 0;
          statSomewhatHigh.style.opacity = 1;
          statNeutral.style.opacity = 0;

        } else if (progress < 0.88) {
          const step = (progress - 0.72) / 0.16;

          imgStanding.style.opacity = 0;
          imgVeryHigh.style.opacity = 0;
          imgSomewhatHigh.style.opacity = 1 - step;
          imgNeutral.style.opacity = step;

          statVeryHigh.style.opacity = 0;
          statSomewhatHigh.style.opacity = 1 - step;
          statNeutral.style.opacity = step;

        } else {
          imgStanding.style.opacity = 0;
          imgVeryHigh.style.opacity = 0;
          imgSomewhatHigh.style.opacity = 0;
          imgNeutral.style.opacity = 1;

          statVeryHigh.style.opacity = 0;
          statSomewhatHigh.style.opacity = 0;
          statNeutral.style.opacity = 1;
        }
      }
    }

  }


  /* ========================================================================
     [INDEX: EVENT LISTENERS] 스크롤 이벤트 연결
     ======================================================================== */

  window.addEventListener(
    'scroll',
    handleMasterScroll,
    { passive: true }
  );

  window.addEventListener('resize', handleMasterScroll);

  // 페이지 최초 로딩 시에도 현재 스크롤 위치에 맞게 실행
  handleMasterScroll();

});
