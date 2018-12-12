import Image
import ImageColor
import time
from decimal import *

centerX = Decimal('0.001643721971153')
centerY = Decimal('0.822467633298876')

zoomIterations = Decimal(25)
finalZoom = Decimal(100)
detail = Decimal(1)
width=Decimal(1920)*detail
height=Decimal(1080)*detail
rangeY = Decimal('2.0')
rangeX = rangeY * 11 / 9
max_iteration = Decimal(100)
colour = [20, 125, 19]

img = Image.new('RGB', (width, height))
pixels = img.load()

for zoomLevel in range(0,zoomIterations):
    getcontext().prec = 15 + (zoomLevel * 20)
    zoomLevel = Decimal(zoomLevel)
    print str(zoomLevel)
    currentZoom = finalZoom**(zoomLevel/(zoomIterations-1))
    print str(currentZoom)
    rangeX = rangeX / currentZoom
    rangeY = rangeY / currentZoom
    for pixel_x in range(0,width-1):
        for pixel_y in range(0,height-1):
            x0 = Decimal('0.0')
            y0 = Decimal('0.0')
            x0 = (pixel_x * rangeX) / (width-1) + (centerX - (rangeX / 2))
            y0 = (pixel_y * rangeY) / (height-1) + (centerY - (rangeY / 2))
            if (pixel_y==0 and pixel_x%50==0):
                print "Pixels: ("+str(pixel_x)+","+str(pixel_y)+") Coords: ("+str(x0)+","+str(y0)+")"
            x = Decimal('0.0')
            y = Decimal('0.0')
            i = -1
            while (x*x + y*y < 4 and i < max_iteration):
                xtemp = x*x - y*y + x0
                y = 2*x*y + y0
                x = xtemp
                i = i + 1
            if i==100:
                i=0
            pixels[pixel_x,pixel_y] = ImageColor.getrgb("hsl(235,100%,"+str(i)+"%)")
    img.save("ZoomOutput\output"+str(int(zoomLevel+1)).zfill(3)+".jpg")
    print "Image "+str(int(zoomLevel+1))+" complete"
    time.sleep(3)

