function GridView(options) {
	let that = this,
		db = options.db,
		entity = options.entity,

		data = options.data,
		modelList = options.modelList,
		model = options.model,
		newID,

		$grid = $('<table>', { 'class': 'container' }),
		$gHead = $('<thead>'),
		$gBody,
		$gFoot = $('<tfoot>'),

		editBtn,
		removeBtn,
		newBtn,
		saveBtn,
		cols = options.cols,
		sortState = true,
		gridMode = GridView.GRID_MODE.VIEW,
		iValArr = [];
	
	newID = 1; //Object.keys(data).length;

	this.initHead = function () {
		let $gHeadRow = $('<tr>'),
			insertTh = $('<th>', { text: 'Insert', title: 'Insert' }),
			removeTh = $('<th>', { text: 'Remove', title: 'Remove' });

		$gHeadRow.append(insertTh);
		for (let i = 0; i < cols.length; i++) {
			let col = cols[i],
				cap = col.cap,
				isSortable = col.isSortable,
				tooltip = col.alt,
				colOptions = { text: cap, title: tooltip };

			if (isSortable) {
				colOptions.click = function () {
					var option = $(this);

					option.find('img').remove();

					data = data.sortList(data, sortState ? BaseModelList.ASC : BaseModelList.DESC, col.name);

					option.append($('<img>').addClass('sort_' + (sortState ? 'down' : 'up')));

					sortState = !sortState;
					that.loadGrid();
				};
			}
			gCol = $('<th>', colOptions);

			$gHeadRow.append(gCol);
		}
		$gHeadRow.append(removeTh);
		$gHead.append($gHeadRow);
		$grid.append($gHead);
	};

	this.initGrid = function () {
		data = new modelList({ model: model, db: db, entity: entity });
		this.loadGrid();
	};
	this.loadGrid = function () {
		let $gBody = $('<tbody>');
		data.forEach(function (item, i) {
			let row = $('<tr>'),
				insertTd = $('<td>'),
				removeTd = $('<td>'),

			editBtn = $('<input>', { type: 'button', 'class': 'editBtn', title: 'Edit', alt: ' ' });
			removeBtn = $('<input>', { type: 'button', 'class': 'removeBtn', title: 'Remove', alt: ' ' });

			row.append(insertTd.append(editBtn));

			editBtn.on('click', function () {
				/*let iLength = $($(this).closest('tr')).find('i').length,
					iValArr = [];

				saveBtn = $('<input>', { type: 'image', 'class': 'saveBtn', title: 'Save', alt: ' ' });
				cancelBtn = $('<input>', { type: 'image', 'class': 'cancelBtn', title: 'Cancel', alt: ' ' });

				for (let i = 0; i < iLength; i++) {
					
					let iTag = $($(this).closest('tr')).find('i')[i];

					iValArr.push(iTag);
					$(iTag).parent().append($('<input>', { type: 'text' }).val($(iTag).text()));
					$(iTag).remove();
				}				

				$(this).parent().empty().append(cancelBtn, saveBtn);*/
			});

			removeBtn.on('click', function () {
				let rb = $(this);
				if (confirm(MESSAGES.DELETE_ROW)) {
					let pk = rb.closest('tr').find('span').text();
					rb.closest('tr').remove();
					data.delete(pk);
				}
			});

			for (let j = 0; j < cols.length; j++) {
				let col = cols[j],
					text = item[col.name],
					tooltip = item[col.tooltip],
					tempText = Function.isFunction(col.temp) ? col.temp(item) : col.temp,
					temp = Function.isFunction(col.temp) ? $(tempText) : $(tempText).text(text).attr({ title: tooltip }),
					cell = $('<td>').append(temp);

				row.append(cell);
				row.append(removeTd.append(removeBtn));
			}
			$gBody.append(row);
		});

		$grid.find('tbody').remove();
		$grid.append($gBody).append($gFoot);
	};
	this.initFoot = function () {
		
		let $gBody = $grid.find('tbody'), $gFootRow = $('<tr>');

		newBtn = $('<input>', { type: 'button', 'class': 'newBtn', title: 'New', alt: ' ' });
		$gFootRow.append($('<td>').append(newBtn));

		newBtn.on('click', function () {
			if (gridMode == GridView.GRID_MODE.EDIT) return;
			saveBtn = $('<input>', { type: 'button', 'class': 'saveBtn', title: 'Save', alt: ' ' });
			cancelBtn = $('<input>', { type: 'button', 'class': 'cancelBtn', title: 'Cancel', alt: ' ' });
			removeBtn = $('<input>', { type: 'button', 'class': 'removeBtn', title: 'Remove', alt: ' ' });

		

			let $row = $('<tr>'),
				item = Object.keys(data)[Object.keys(data).length - 1];

			for (let j = 0; j < cols.length; j++) {
				let col = cols[j],
					text = item[col.name],
					editTempText = Function.isFunction(col.editTemp) ? col.editTemp(item) : col.editTemp,
					editTemp = Function.isFunction(col.editTemp) ? $(editTempText) :
						$(editTempText)
							.attr({
								type: 'ID' == col.name ? 'hidden' : 'text',
								maxlength: 'CountryCode' == col.name ? 2 : 80,
								name: col.name,
								value: 'ID' == col.name ? newID++ : ''
							})
							.css('text-transform', 'CountryCode' == col.name ? 'uppercase' : 'capitalize');

				cell = $('<td>').append(editTemp);
				$row.append(cell);

				gridMode = GridView.GRID_MODE.EDIT;
				console.log('NEW', gridMode);
			}

			saveBtn.on('click', function () {
				let inputArr = $gBody.find('tr:first :text');

				editBtn = $('<input>', { type: 'button', 'class': 'editBtn', title: 'Edit', alt: ' ' });//////////

				//editBtn.on('click', function () {
				//
				//});

				for (let i = 0; i < inputArr.length; i++) {
					let $input = $(inputArr[i]),
						inputVal = $input.val();

					if (/^\s*$/.test(inputVal)) {
						alert(MESSAGES.REQUIRED_FIELDS);
						gridMode = GridView.GRID_MODE.EDIT;
						console.log('SAVE:REQUIRED', gridMode);
						return null;
					};

					$input.val(inputVal.replace(/^\s+|\s+$/g, ''));
				}

				for (let i = 0; i < inputArr.length; i++) {
					data.forEach(function(item, i){
						for (let j = 1; j < cols.length; j++) {
							let col = cols[j],
								text = item[col.name];

							if ($(inputArr[i]).val() == text) {
								alert(MESSAGES.VALUES_REPEAT);
								gridMode = GridView.GRID_MODE.EDIT;
								console.log('SAVE:UNIQUE', gridMode);
								return null;
							}
						}
					});
				}

				for (let i = 0; i < inputArr.length; i++) {
					let $input = $(inputArr[i]),
						val = $input.val();

					$input.parent().html($('<i>', {
						text: val[
								'CountryName' == $input.attr('name') ?
								'capitalize' : 'toUpperCase'
						](),
						title: val[////////////////
								'CountryName' == $input.attr('name') ?
								'capitalize' : 'toUpperCase'
						]()
					}));
				}

				//var obj = {}; ////////////////
				//obj['ID'] = 

				//removeBtn
				//	.on('click', function () { ////////// repeat
				//		if (confirm(MESSAGES.DELETE_ROW)) {
				//			$gBody.find(':first').remove();
				//		}
				//	})
				//	.removeAttr('disabled')
				//	.css({ 'filter': 'none', '-webkit-filter': 'none' }); ///////////// //senc inchqanov a cisht jnjel attributner@ ?

				$(this).closest('td').empty().append(editBtn);
				gridMode = GridView.GRID_MODE.VIEW;
				console.log('CANCEL', gridMode);
			});

			cancelBtn.on('click', function () {
				$gBody.find('tr:first').remove();
				gridMode = GridView.GRID_MODE.VIEW;
				console.log('CANCEL', gridMode);
			});

			$row
				.prepend($('<td>')
					.append(cancelBtn, saveBtn))
				.append($('<td>')
					.append(removeBtn
						.attr('disabled', 'disabled')
						.css({ 'filter': 'contrast(40%)', '-webkit-filter': 'contrast(40%)' })));
			$gBody.prepend($row);
			gridMode = GridView.GRID_MODE.EDIT;
			console.log('NEW', gridMode);
		});
		
		$gFoot.append($gFootRow);
		$grid.append($gFoot);
	};

	this.initHead();
	this.initGrid();
	this.initFoot();

	return $grid;
}

GridView.GRID_MODE = {
	VIEW: true,
	EDIT: false
};