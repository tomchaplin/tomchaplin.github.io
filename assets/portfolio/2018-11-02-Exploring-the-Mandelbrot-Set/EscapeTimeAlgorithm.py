import Image
import ImageColor

detail = 5
width=1920*detail
height=1080*detail
minX = -2.5
maxX = 1.0
rangeX = maxX - minX
minY = -1.0
maxY = 1.0
rangeY = maxY - minY
max_iteration = 100
colour = [20, 125, 19]

img = Image.new('RGB', (width, height))
pixels = img.load()

for pixel_x in range(0,width-1):
	for pixel_y in range(0,height-1):
		x0 = 0.0
		y0 = 0.0
		x0 = (pixel_x * rangeX) / (width-1) + minX
		y0 = (pixel_y * rangeY) / (height-1) + minY
		print "Pixels: ("+str(pixel_x)+","+str(pixel_y)+") Coords: ("+str(x0)+","+str(y0)+")"
		x = 0.0
		y = 0.0
		i = -1
		while (x*x + y*y < 4 and i < max_iteration):
			xtemp = x*x - y*y + x0
			y = 2*x*y + y0
			x = xtemp
			i = i + 1
		if i==100:
			i=0
		pixels[pixel_x,pixel_y] = ImageColor.getrgb("hsl(235,100%,"+str(i)+"%)")

img.save("output.jpg")