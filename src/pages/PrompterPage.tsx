import React, { useEffect, useRef, useState } from 'react';
import { Page, TeleprompterSettings } from '../types';

interface PrompterPageProps {
  script: string;
  settings: TeleprompterSettings;
  onNavigate: (page: Page) => void;
}

export function PrompterPage({ script: text, settings, onNavigate }: PrompterPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollIntervalRef = useRef<number | null>(null);

  // Calculate scroll speed: 0-100 maps to 0.5px to 10px per frame
  const scrollSpeed = settings.scrollSpeed;
  const pixelsPerFrame = 0.5 + (scrollSpeed / 100) * 9.5;

  useEffect(() => {
    if (isAutoScrolling && settings.isAutoScrollSelected) {
      const interval = setInterval(() => {
        if (containerRef.current) {
          const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
          const currentScroll = containerRef.current.scrollTop;
          
          if (currentScroll < maxScroll) {
            containerRef.current.scrollTop += pixelsPerFrame; // 4 is the speed multiplier
          } else {
            // Reached bottom, stop auto-scroll
            setIsAutoScrolling(false);
          }
        }
      }, 16); // ~60fps

      scrollIntervalRef.current = interval as unknown as number;
      return () => {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
        }
      };
    }
  }, [isAutoScrolling, settings.isAutoScrollSelected, pixelsPerFrame]);

  const handleStopAutoScroll = () => {
    setIsAutoScrolling(false);
  };

  const getContainerFlipStyles = () => {
    const styles: React.CSSProperties = {};
    styles.backgroundColor = settings.bgColor;
    switch (settings.flipMode) {
      case 'horizontal':
        // Flip container horizontally: scale(-1, 1) means -100% horizontal, 100% vertical
        styles.transform = 'scale(-1, 1)';
        break;
      case 'vertical':
        // Flip container vertically: scale(1, -1) means 100% horizontal, -100% vertical
        styles.transform = 'scale(1, -1)';
        break;
      case 'both':
        // Flip container both ways: scale(-1, -1) means -100% horizontal, -100% vertical
        styles.transform = 'scale(-1, -1)';
        break;
      default:
        break;
    }
    return styles;
  };


  return (
    <div className="prompter-page">

      <div className="prompter-controls">
        <button
          className="btn btn-secondary"
          onClick={() => onNavigate('setup')}
        >
          ← Back to Setup
        </button>
        {isAutoScrolling && (
          <button
            className="btn btn-warning"
            onClick={handleStopAutoScroll}
          >
            Pause Auto Scroll
          </button>
        )}
        {!isAutoScrolling && settings.isAutoScrollSelected && (
          <button
            className="btn btn-play"
            onClick={() => setIsAutoScrolling(true)}
          >
            Play Auto Scroll
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="prompter-container"
        style={getContainerFlipStyles()}
      >
        {settings.isShowingPlacemarker && (<div className="prompter-placemarker" 
        style={{ height: `${settings.fontSize * 2}rem` }} />)}
        <div
          ref={textRef}
          className="prompter-text"
          style={{
            fontSize: `${settings.fontSize}rem`,
            lineHeight: settings.lineHeight ?`${settings.lineHeight* 100}%` : '150%',
            color: settings.fontColor,
          }}
        >
          <div className="script-ends">
        <p>- SCRIPT BEGINS -</p>
      </div>
          {text.split('\n').map((line, index) => (
            <div key={index} className="prompter-line" dangerouslySetInnerHTML={{ __html: line  || '\u00A0'}}>
            </div>
          ))}
      <div className="script-ends">
        <p>- SCRIPT ENDS -</p>
      </div>

        </div>

      </div>
    </div>
  );
}

