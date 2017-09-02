"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mds_datetime_picker_utility_1 = require("../assests/mds-datetime-picker.utility");
var mds_datetime_picker_core_component_1 = require("./core/mds-datetime-picker-core.component");
var enums_1 = require("../assests/enums");
var MdsDatetimePickerComponent = (function () {
    function MdsDatetimePickerComponent(element) {
        var _this = this;
        this.element = element;
        this.templateType = enums_1.TemplateTypeEnum.bootstrap;
        this.textBoxType = enums_1.TextBoxTypeEnum.withButton;
        this.value = '';
        this.inLine = true;
        this.persianChar = true;
        this.rangeSelector = false;
        this.isPersian = true;
        this.timePicker = true;
        this.placeHolder = '';
        this.format = '';
        this.selectedDateString = '';
        this.topOffset = 0;
        this.leftOffset = 0;
        this.showDatePicker = false;
        this.afterViewInit = false;
        this.alreadyShowDatePickerClicked = false;
        this.oldDateValue = '';
        this.dateChanged = new core_1.EventEmitter();
        this.rangeDateChanged = new core_1.EventEmitter();
        this.keyDown = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        var doc = document.getElementsByTagName('html')[0];
        doc.addEventListener('click', function (event) {
            var targetElement = event.target;
            if (_this.showDatePicker && event.target &&
                _this.element.nativeElement !== event.target &&
                !_this.element.nativeElement.contains(event.target) &&
                !targetElement.hasAttribute('data-mdspersiancalendar')) {
                _this.showDatePicker = false;
                _this.mdsDateTimePickerCore.hideSelecMonthAndYearBlock();
                _this.mdsDateTimePickerCore.resetIncompleteRanges();
            }
        }, false);
    }
    MdsDatetimePickerComponent.prototype.ngOnInit = function () {
        this.setDateTime(this.value);
    };
    MdsDatetimePickerComponent.prototype.ngAfterViewInit = function () {
        this.afterViewInit = true;
    };
    Object.defineProperty(MdsDatetimePickerComponent.prototype, "getTopOffset", {
        get: function () {
            return (this.topOffset + 23) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MdsDatetimePickerComponent.prototype, "getLeftOffset", {
        get: function () {
            return this.leftOffset + 'px';
        },
        enumerable: true,
        configurable: true
    });
    MdsDatetimePickerComponent.prototype.setDateTime = function (dateTimeString) {
        dateTimeString = !this.persianChar ? mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toEnglishString(dateTimeString) : mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toPersianNumber(dateTimeString);
        if (dateTimeString != '' && this.rangeSelector) {
            if (this.isPersian)
                mds_datetime_picker_utility_1.MdsDatetimePickerUtility.getPersianDateRanges(dateTimeString);
            else
                mds_datetime_picker_utility_1.MdsDatetimePickerUtility.getDateRanges(dateTimeString);
            this.selectedDateString = dateTimeString;
        }
        else
            this.selectedDateString = dateTimeString;
        this.value = this.selectedDateString;
    };
    MdsDatetimePickerComponent.prototype.dateChangedHandler = function (date) {
        if (!this.afterViewInit)
            return;
        this.value = this.selectedDateString = date.formatString;
        this.dateChanged.emit(date);
        this.showDatePicker = false;
    };
    MdsDatetimePickerComponent.prototype.rangeDateChangedHandler = function (rangeDate) {
        if (!this.afterViewInit)
            return;
        this.selectedDateString = '';
        this.value = '';
        if (rangeDate.startDate.formatString != '' && rangeDate.endDate.formatString != '')
            this.selectedDateString = rangeDate.startDate.formatString + " - " + rangeDate.endDate.formatString;
        this.rangeDateChanged.emit(rangeDate);
        if (rangeDate.startDate.formatString != '' && rangeDate.endDate.formatString != '')
            this.showDatePicker = false;
        this.value = this.selectedDateString;
    };
    MdsDatetimePickerComponent.prototype.showDatePickerButtonClicked = function () {
        this.showDatePicker = !this.showDatePicker;
        this.value = this.selectedDateString;
        this.alreadyShowDatePickerClicked = true;
        if (this.showDatePicker) {
            var rectObject = this.element.nativeElement.getBoundingClientRect();
            this.topOffset = rectObject.top;
            this.leftOffset = rectObject.left;
        }
    };
    MdsDatetimePickerComponent.prototype.dateTimeTextBoxOnFocus = function (event) {
        this.oldDateValue = event.target.value.trim();
        if (this.textBoxType == enums_1.TextBoxTypeEnum.withoutButton)
            this.showDatePickerButtonClicked();
        this.focus.emit(event);
    };
    MdsDatetimePickerComponent.prototype.dateTimeTextBoxOnBlur = function (event) {
        if (this.alreadyShowDatePickerClicked && this.textBoxType == enums_1.TextBoxTypeEnum.withButton) {
            this.alreadyShowDatePickerClicked = false;
            return;
        }
        this.alreadyShowDatePickerClicked = false;
        try {
            this.mdsDateTimePickerCore.setDateTimeByString(this.selectedDateString);
            if (this.isPersian && this.persianChar)
                this.selectedDateString = mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toPersianNumber(this.selectedDateString);
            else
                this.selectedDateString = mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toEnglishString(this.selectedDateString);
        }
        catch (e) {
            this.selectedDateString = this.oldDateValue;
            console.log(e);
        }
        this.value = this.selectedDateString;
        this.blur.emit(event);
    };
    MdsDatetimePickerComponent.prototype.dateTimeTextBoxOnKeyDown = function (event) {
        this.keyDown.emit(event);
        if (event.keyCode != 13)
            return;
        this.value = this.selectedDateString = event.target.value.trim();
        if (this.value == '') {
            this.mdsDateTimePickerCore.mdsPersianDateTime = null;
            this.mdsDateTimePickerCore.startMdsPersianDateTime = null;
            this.mdsDateTimePickerCore.endMdsPersianDateTime = null;
            this.mdsDateTimePickerCore.dateTime = null;
            this.mdsDateTimePickerCore.startDateTime = null;
            this.mdsDateTimePickerCore.endDateTime = null;
        }
        else {
            this.mdsDateTimePickerCore.setDateTimeByString(this.selectedDateString);
            if (this.isPersian && this.persianChar)
                this.value = this.selectedDateString = mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toPersianNumber(this.selectedDateString);
            else
                this.value = this.selectedDateString = mds_datetime_picker_utility_1.MdsDatetimePickerUtility.toEnglishString(this.selectedDateString);
        }
        if (this.rangeSelector)
            this.rangeDateChanged.emit(this.mdsDateTimePickerCore.getRangeDates);
        else
            this.dateChanged.emit(this.mdsDateTimePickerCore.getDate);
        this.showDatePicker = false;
    };
    __decorate([
        core_1.ViewChild('mdsDateTimePickerCore'),
        __metadata("design:type", mds_datetime_picker_core_component_1.MdsDatetimePickerCoreComponent)
    ], MdsDatetimePickerComponent.prototype, "mdsDateTimePickerCore", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MdsDatetimePickerComponent.prototype, "templateType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MdsDatetimePickerComponent.prototype, "textBoxType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "inLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "persianChar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "rangeSelector", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "isPersian", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "timePicker", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "format", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "dateChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "rangeDateChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "keyDown", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MdsDatetimePickerComponent.prototype, "focus", void 0);
    MdsDatetimePickerComponent = __decorate([
        core_1.Component({
            selector: 'mds-datetime-picker',
            templateUrl: './mds-datetime-picker.component.html',
            styleUrls: ['./mds-datetime-picker.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], MdsDatetimePickerComponent);
    return MdsDatetimePickerComponent;
}());
exports.MdsDatetimePickerComponent = MdsDatetimePickerComponent;
//# sourceMappingURL=mds-datetime-picker.component.js.map