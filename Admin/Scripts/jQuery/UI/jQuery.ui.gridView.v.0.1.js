function GridView(options) {
	let that = this,
        data = options.storeData,
		$grid = $('<table>', { id: 'Container', 'class': 'container' }),
		$gHead = $('<thead>'),
		$gBody,
		$gFoot = $('<tfoot>'),
        editBtn,
        removeBtn,
        newBtn,
        saveBtn,
		cols = options.cols,
        sortState = true;

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
			console.log(col);
			if (isSortable) {
				colOptions.click = function () {
					$(this).find('img').remove();
					data = data.sortList( sortState ? BaseModelList.ASC : BaseModelList.DESC, col.name);
					$(this).append($('<img>').addClass( sortState ? 'showSortIconDown' : 'showSortIconUp'));
					 
					sortState = !sortState;
					that.initGrid();
				}
			}
			gCol = $('<th>', colOptions);

			$gHeadRow.append(gCol);
		}
		$gHeadRow.append(removeTh);
		$gHead.append($gHeadRow);
		$grid.append($gHead);
	};

	this.initGrid = function () {
		let storageData = JSON.parse(localStorage.gridData);
		$gBody = $('<tbody>');

		for (let i = 1; i < storageData.length; i++) {
			let row = $('<tr>'),
                insertTd = $('<td>'),
                removeTd = $('<td>'),
                item = storageData[i];

			item = 'string' == typeof item ? JSON.parse(item) : item;

			editBtn = $('<input>', { type: 'image', group_name: 'editBtn', title: 'Edit', alt: ' ' });
			removeBtn = $('<input>', { type: 'image', id: 'removeBtn', title: 'Remove', alt: ' ' });

			row.append(insertTd.append(editBtn));

			removeBtn.on('click', function () {
				if (confirm(MESSAGES.DELETE_ROW)) {
					$gBody.find(':first').remove();
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
		}

		$('[group_name="editBtn"]').on('click', function () { /////////////////////
			alert(1);
			let iArr = $($(this).closest('tr')).find('i');
			
			for (let i = 0; i < iArr.length; i++) {
				iArr[i] = $('<input>', { value: $($($(this).closest('tr')).find('i')[i]).text() });
			}
		});

		$grid.find('tbody').remove();
		$grid.append($gBody).append($gFoot);
	};

	this.initFoot = function () {
		let $gFootRow = $('<tr>');

		newBtn = $('<input>', { type: 'image', id: 'newBtn', title: 'New', alt: ' ' });
		$gFootRow.append($('<td>').append(newBtn));

		newBtn.on('click', function () {
			saveBtn = $('<input>', { type: 'image', id: 'saveBtn', title: 'Save', alt: ' ' });
			cancelBtn = $('<input>', { type: 'image', id: 'cancelBtn', title: 'Cancel', alt: ' ' });
			removeBtn = $('<input>', { type: 'image', id: 'removeBtn', title: 'Remove', alt: ' ' });

			if ($gBody.find('tr:first :text').length) { return null; }
			let $row = $('<tr>'),
                item = storeData[0];

			for (let j = 0; j < cols.length; j++) {
				let col = cols[j],
                    text = item[col.name],
                    editTempText = Function.isFunction(col.editTemp) ? col.editTemp(item) : col.editTemp,
                    editTemp = Function.isFunction(col.editTemp) ? $(editTempText) :
						$(editTempText)
							.attr({
								type: 'ID' == col.name ? 'hidden' : 'text',
								maxlength: 'CountryCode' == col.name ? 2 : 80,
								name: col.name
							})
							.css('text-transform', 'CountryCode' == col.name ? 'uppercase' : 'capitalize');

				cell = $('<td>').append(editTemp);
				$row.append(cell);
			}

			saveBtn.on('click', function () {
				let inputArr = $gBody.find('tr:first :text');

				editBtn = $('<input>', {
					type: 'image',
					group_name: 'editBtn', title: 'Edit', alt: ' '
				});

				for (let i = 0; i < inputArr.length; i++) {
					if (!$(inputArr[i]).val()) {
						alert(MESSAGES.REQUIRED_FIELDS);
						return null;
					};
				}

				for (let i = 0; i < inputArr.length;i++) {
					for (let j = 0; j < Object.keys(data).length - 1; j++) {
						item = data[j];
				
						for (let k = 1; k < cols.length; k++) {
							let col = cols[k],
								text = item[col.name];

							if ($(inputArr[i]).val() == text) {
								alert(MESSAGES.VALUES_REPEAT);
								return null;
							}
						}
					}
				}

				for (let i = 0; i < inputArr.length; i++) {
					let $input = $(inputArr[i]), val = $input.val();
					
					$input.parent().html($('<i>', {
						text: val[
								'CountryName' == $input.attr('name') ?
								'capitalize' : 'toUpperCase'
							](),
						title: val
					}));
				}
				removeBtn.on('click', function () { ////////// repeat
					if (confirm(MESSAGES.DELETE_ROW)) {
						$gBody.find(':first').remove();
					}
				});
				removeBtn
					.removeAttr('disabled')
					.css({ 'filter': '', '-webkit-filter': '' });  /////////////////
				$(this).closest('td').empty().append(editBtn);
			});

			cancelBtn.on('click', function () {
				$gBody.find('tr:first').remove();
			})

			$row.prepend($('<td>').append(cancelBtn).append(saveBtn));
			$row.append($('<td>').append(removeBtn
				.attr('disabled', 'disabled')
				.css({ 'filter': 'contrast(40%)', '-webkit-filter': 'contrast(40%)' })));
			$gBody.prepend($row);
		});
		
		$gFoot.append($gFootRow);
		$grid.append($gFoot);
	};

	this.initHead();
	this.initGrid();
	this.initFoot();

	return $grid;
}