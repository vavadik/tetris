$(document).ready(function()
{
	var game = new Game(300);
	game.start();
})


Game = function(rWidth)
{
	gameField = []
	width = 10;
	height = width * 2;
	field = new Field(rWidth, width);
	speed = 500; // One update per second

	for(var i = 0; i < width; i++)
	{
		gameField[i] = []
		for(var j = 0; j < height; j++)
		{
			gameField[i][j] = 0;
		}
	}
	gameField[4][4] = 1;
	gameField[4][5] = 1;
	gameField[4][8] = 1;
	gameField[4][9] = 1;


	this.start = function()
	{
		setInterval(update, speed);
		setInterval(draw, 20);
	}

	function update()
	{
		//Figure.draw();
		for(var j = height - 1; j >= 0; j--)
		{
			for(var i = 0; i < width; i++)
			{
				if(gameField[i][j] == 1 && gameField[i][j+1] != 2 && j < height - 1)
				{
					gameField[i][j] = 0;
					gameField[i][j+1] = 1;
				}
				else if(gameField[i][j] == 1)
				{
					gameField[i][j] = 2;
				}
			}
		}
	}

	function draw()
	{
		for(var i = 0; i < width; i++)
		{
			for(var j = 0; j < height; j++)
			{
				field.setCellStatus(i, j, gameField[i][j]);
			}
		}
	}

	Figure = 
	{
		position: [width / 2, 0],
		form: [[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0]],

		create: function()
		{

		},

		moveDown: function()
		{
			this.position[1]++;
		},

		draw: function()
		{
			for(var i = 0; i < 3; i++)
			{
				for(var j = 0; j < 3; j++)
				{
					gameField[this.position[0] + i, this.position[1] + j] = this.form[i,j];
				}
			}
		}
	}
}

Field = function(rWidth, fWidth)
{
	this.realWidth = rWidth;
	this.realHeight = this.realWidth * 2;
	this.width = fWidth;
	this.height = fWidth * 2;
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
		if(status == 1)
		{
	 		this.fieldArray[x][y].attr("fill", "#f00");
	 	}
	 	else if(status == 2)
	 	{
	 		this.fieldArray[x][y].attr("fill", "#00f");
	 	}
	 	else
	 	{
	 		this.fieldArray[x][y].attr("fill", "#fff");
	 	}
	}
}