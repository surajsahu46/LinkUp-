import { useEffect, useRef } from 'react';

export function useNotifications() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
  };

  const sendNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
      audioRef.current?.play();
    }
  };

  return { requestPermission, sendNotification };
}