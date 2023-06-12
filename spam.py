import pyautogui
import webbrowser as web
from  time import sleep

web.open("https://web.whatsapp.com/send?phone=3102400285")
sleep(10)



for i in range(100):
  pyautogui.typewrite('BURROOO')
  pyautogui.press('enter')