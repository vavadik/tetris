$(document).ready(function()
{
	var field = new Field(300);
	field.setCellStatus(5,10,1);
	field.setCellStatus(5,11,1);
	field.setCellStatus(5,9,1);
	field.setCellStatus(6,9,1);
})

function Field(rWidth)
{
	this.realWidth = rWidth;
	this.realHeight = this.realWidth * 2;
	this.width = 10;
	this.height = 20;
	this.paper = Raphael(10, 50, this.realWidth, this.realHeight);
	this.wMult = this.realWidth/this.width; 
	this.hMult = this.realHeight/this.height;
	this.fieldArray = [];

	for(var i = 0; i < this.width; i++)
	{
		this.fieldArray[i] = []
		for(var j = 0; j < this.height; j++)
		{
			this.fieldArray[i][j] = this.paper.rect(i * this.wMult, j * this.hMult, this.wMult, this.hMult);
		}
	}

	this.setCellStatus = function(x, y, status)
	{
		if(status)
		{
	 		this.fieldArray[x][y].attr("fill", "#f00");
	 	}
	 	else
	 	{
	 		this.fieldArray[x][y].attr("fill", "#fff");
	 	}
	}
}