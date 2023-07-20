import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const AlbumCover = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 10%;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  button {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    background-color: blue;
    color: white;
    font-size: 20px;
  }
`;

const Audio = styled.audio`
  display: none;
`;

const MP3Player = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioSource = "/music/INSTASAMKA_-_juicy.mp3";
  const coverImage =
    "https://api.nsn.fm/storage/medialib/372363/mobile_image-140aeaa7af562f26cccc5d34ebbe9a95.jpg";

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const handlePlayPause = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (audioRef.current.paused) {
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContainer>
      <h2>MP3 Player</h2>
      <AlbumCover src={coverImage} alt="Album Cover" />
      <Controls>
        <button onClick={handlePlayPause}>Play</button>
        <button onClick={handleStop}>Stop</button>
      </Controls>
      <Audio ref={audioRef} src={audioSource} />
    </PlayerContainer>
  );
};

export default MP3Player;
