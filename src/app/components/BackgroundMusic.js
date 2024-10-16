import { useEffect, useRef } from 'react';

const audioFiles = [
    '/music/audio/audio1.mp3',
    '/music/audio/audio2.mp3',
    '/music/audio/audio3.mp3',
];

const BackgroundMusic = ({ isPlaying }) => {
    const audioRef = useRef(null);
    const currentTrackIndex = useRef(0);

    useEffect(() => {
        if (isPlaying) {
            playAudio();
        } else {
            stopAudio();
        }


        return () => {
            stopAudio();
        };
    }, [isPlaying]);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause(); // Pause any currently playing audio
            audioRef.current.currentTime = 0; // Reset current time
        }

        // Create a new Audio object and set the current track
        audioRef.current = new Audio(audioFiles[currentTrackIndex.current]);
        audioRef.current.loop = false;

        audioRef.current.play();

        audioRef.current.onended = () => {
            currentTrackIndex.current = (currentTrackIndex.current + 1) % audioFiles.length;
            playAudio(); // Play the next track
        };
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause(); // Pause the audio
            audioRef.current.currentTime = 0; // Reset to start
            currentTrackIndex.current = 0; // Reset track index
        }
    };

    return null; // This component doesn't render anything
};

export default BackgroundMusic;
