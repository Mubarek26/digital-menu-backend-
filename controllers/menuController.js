const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const MenuItem = require('../models/MenuItem');


exports.getAllMenuItems = catchAsync(async (req, res, next) => {
    const menuItems = await MenuItem.find(); // Fetch all menu items from the database

    if (!menuItems) {
        return next(new appError('No menu items found', 404));
    }
    // Assuming the fetch was successful, send a response with the menu items
    res.status(200).json({

        status: 'success',
        message: 'All menu items retrieved successfully',
        data: {
            menuItems: menuItems // This should be replaced with actual data from the database
        }
    })


})



exports.createMenuItem = catchAsync(async (req, res, next) => {
    const newMenuItem = await MenuItem.create(req.body); // Assuming req.body contains the menu item data

    if (!newMenuItem) {
        return next(new appError('Failed to create menu item', 400));
    }
    // Assuming the creation was successful, send a response

    res.status(201).json({
        status: 'success',
        message: 'Menu item created successfully',
        data: {
            menuItem: newMenuItem // This should be replaced with actual data from the database
        }

    })

})




exports.updateMenuItem = catchAsync(async (req, res, next) => {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,)
    if (!updatedMenuItem) {
        return next(new appError('No menu item found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        message: 'Menu item updated successfully',
        data: {
            menuItem: updatedMenuItem // This should be replaced with actual data from the database
        }
    
})
})


exports.deleteMenuItem = catchAsync(async (req, res, next) => {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
        return next(new appError('No menu item found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        message: 'Menu item deleted successfully',
        data: null // No content to return for deletion

    })

})



exports.getMenuItem = catchAsync(async (req, res, next) => {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
        return next(new appError('No menu item found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'Menu item retrieved successfully',
        data: {
            menuItem: menuItem // This should be replaced with actual data from the database
        }

    })

})


