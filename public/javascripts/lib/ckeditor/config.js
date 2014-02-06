/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.enterMode = CKEDITOR.ENTER_BR;
	config.shiftEnterMode = CKEDITOR.ENTER_P;
	config.toolbar = [
		['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat'],
		['Link', 'Unlink', 'Anchor'],
		['Image', 'Table', 'HorizontalRule', 'SpecialChar'],
		['NumberedList', 'BulletedList', 'Blockquote', 'Outdent', 'Indent'],
		['Styles', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor'],
		['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
		['Undo', 'Redo'],
		['Find', 'Replace'],
		['Source','Maximize','Preview']
	];
};