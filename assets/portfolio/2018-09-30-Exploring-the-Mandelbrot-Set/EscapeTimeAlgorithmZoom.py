import Image
import ImageColor
import time

centerX = 0.001643721971153 
centerY = 0.822467633298876 * (-1)

zoomIterations = 10
finalZoom = 100
detail = 1
width=1920*detail
height=1080*detail
rangeY = 2.0
rangeX = rangeY * 11 / 9
max_iteration = 200
colour = [20, 125, 19]

img = Image.new('RGB', (width, height))
pixels = img.load()

#0-based counting
width = width - 1
height = height - 1

for zoomLevel in range(0,zoomIterations-1):
    zoomLevel = float(zoomLevel)
    currentZoom = finalZoom**(zoomLevel/(zoomIterations-1))
    rangeX = rangeX / currentZoom
    rangeY = rangeY / currentZoom
    startX = centerX  - (rangeX / 2)
    startY = centerY - (rangeY / 2)
    for pixel_x in range(0,width):
        for pixel_y in range(0,height):
            x0 = 0.0
            y0 = 0.0
            x0 = (pixel_x * rangeX) / width + startX
            y0 = (pixel_y * rangeY) / height + startY
            if (pixel_y==0 and pixel_x%50==0):
                print "Pixels: ("+str(pixel_x)+","+str(pixel_y)+") Coords: ("+str(x0)+","+str(y0)+")"
            x = 0.0
            y = 0.0
            xSqr = 0.0
            ySqr = 0.0
            i = -1
            while (xSqr + ySqr < 4 and i < max_iteration):
                xtemp = xSqr - ySqr + x0
                y = 2*x*y + y0
                x = xtemp
                xSqr = x * x
                ySqr = y * y
                i = i + 1
            if i==max_iteration:
                i=0
            pixels[pixel_x,pixel_y] = ImageColor.getrgb("hsl(235,100%,"+str(int(float(i) / float(max_iteration) * 100))+"%)")
    img.save("ZoomOutput\output"+str(int(zoomLevel+1)).zfill(3)+".jpg")
    print "Image "+str(int(zoomLevel+1))+" complete"
    time.sleep(3)

