require 'terminal-table'

class MenuItem
  def initialize(name, price, description = " ")
    @name = name
    @price = price
    @description = description
  end

  attr_accessor :name, :price, :description
end

class Order
  def initialize()
    @items = []
  end

  def << (menu_item)
    @items << menu_item
  end

  def total
    total = 0
    @items.each do |item|
      total += item.price
    end
    "$#{total}"
  end

  def bill
    table = Terminal::Table.new headings: ['Name', 'Price'] do |t|
      @items.each do |item|
        t << [item.name, "$#{item.price}"]
      end
      t.add_separator
      t << ['TOTAL', total]
    end
    table
  end
end


def load_menu_choice(foodchoice)

  ## load Entrees menu
  if foodchoice == 'entrees'
    @food_menu_items = [
      MenuItem.new('Spring Rolls', 5, 'Vegitarian'),
      MenuItem.new('3 Dips', 7, 'Avacado and Beetroor and Tzatziki'),
      MenuItem.new('Canapes', 8, 'seafood'),
      MenuItem.new('tapas', 9, 'Spanish cusine'),
      MenuItem.new('Dumplings', 10, 'Pork')
    ]
  end

  ## load mains menu choices
  if foodchoice == 'mains'
    @food_menu_items = [
      MenuItem.new('Steak', 20, 'Beef 300g'),
      MenuItem.new('Parma', 15, 'Chicken'),
      MenuItem.new('Eggplant Casserole', 15, 'Vegan'),
      MenuItem.new('Chips', 7, 'Twice fried'),
      MenuItem.new('Salad', 10, 'Greek salad')
    ]
  end

  ## load drinks menu choices
  if foodchoice == 'drinks'
    @food_menu_items = [
      MenuItem.new('Beer', 7, 'Carlton'),
      MenuItem.new('Soft drink', 3.50, 'Coke, Lemon, Fanta'),
      MenuItem.new('Martini', 12, 'James Bond style'),
      MenuItem.new('Margarita', 15, 'Taquila Contraeu Soda '),
      MenuItem.new('Mojito', 15, 'Rum Lime Soda '),
      MenuItem.new('Daiquri', 12, 'Strawberry'),
      MenuItem.new('Mai Tai', 10, 'Hawiaan Style'),
      MenuItem.new('Whiskey Sour', 10, 'Johnny Walker and Soda')
    ]
  end

  ## load Dessert menu
  if foodchoice == 'desserts'
    @food_menu_items = [
      MenuItem.new('Icecreame', 7, 'Chocolate'),
      MenuItem.new('Pavlova', 8, ' Egg whites swipped'),
      MenuItem.new('Tiramisu', 10, 'Busciut dipped in coffe served with cream'),
      MenuItem.new('Chocolate cake', 11, 'Flourless')
    ]
  end


end

  ## 1. menu selection for foodchoice
  def food_menu(menu_order)
    loop do

      system 'clear'
      puts 'Please select from Menu option'
      puts ''
      puts '1. Entrees'
      puts '2. Mains'
      puts '3. Desserts'
      puts '4. Drinks'
      puts '5. Repeat Order'
      puts 'x. Exit'

      choice = gets.chomp
      case choice
      when '1'
        system 'clear'
        order_from_menu(menu_order, 'entrees')
      when '2'
        system 'clear'
        order_from_menu(menu_order, 'mains')
      when '3'
        system 'clear'
        order_from_menu(menu_order, 'desserts')
      when '4'
        system 'clear'
        order_from_menu(menu_order, 'drinks')
      when '5'
        system 'clear'
        print_order(menu_order, '4')
      when 'x'
        break
      else
        system 'clear'
        puts "Invalid choice: #{choice}"
      end

      sleep 2

    end
  end

## ordering from menu item of foodchoice
def order_from_menu(menu_order, foodchoice)

  loop do
    load_menu_choice(foodchoice)
    @food_menu_items.each_with_index do |menu_item, index|
      user_index = index + 1
      # Display item with index first, then name and price
      puts "#{user_index}. #{menu_item.name}: #{menu_item.price} - #{menu_item.description}"
    end

    puts ''
    puts 'What would you like?'
    choice = gets.chomp
    # Stop looping if user pressed just enter
    break if choice == ""

    # User must choose an index number
    user_index = choice.to_i

    # If the user entered in an invalid choice
    if user_index == 0
      "Invalid choice, please try again"
      next # Loop through and ask again
    elsif !@food_menu_items[user_index - 1]
      puts "--#{@food_menu_items[user_index - 1]}--"
      puts "Invalid choice, please try again"
      next # Loop through and ask again
    else
      index = user_index - 1 # Convert to zero-based index
      menu_item = @food_menu_items[index]
      # special order for food item
      menu_item.description = nil  ## nil the description
      puts 'Please enter special requirment for this item? otherwise hit enter to continue'
      menu_item.description = gets.chomp  ## populate description with special requirment

      # Add item to order
      @order << menu_item
      menu_order << menu_item
    end

  end  ##end of loop do

end

### 4 5 print ordered items
def print_order(menu_order, menu_option)

  if menu_option == '4' || menu_option == 'remove'
    menu_order.each_with_index do |item, index|
      print "#{ index + 1 }:  "
      print "#{item.name} - "
      print " (ea $#{'%.2f' % item.price})"
      if item.description != ''
        print " Note: #{item.description} "
      end
      puts # Print newline
    end
  end

  if menu_option == '4'
    puts
    puts 'Press to continue'
    gets # User can enter anything to continue
    sleep 2
  end  ## end for menu option 4

  if menu_option == '5'

    subtotal = 0
    menu_order.each_with_index do |item, index|
      subtotal = subtotal + item.price
    end
    surcharge = subtotal*0.015

    puts 'Thank you'
    puts 'Here is your bill:'
    puts ''
    puts @order.bill
    puts ''

    loop do
      puts 'Please specify payment option list'
      puts ''
      puts '1. By credit card'
      puts '2. By cash'

      choice = gets.chomp
      puts 'Thankyou and I hope you enjoyed your meal.'
      case choice
        when '1'
          ## cc payment option
          print ''
          puts "your surcharge for Credit Crad payment is: ($#{'%.2f' % surcharge})"
          puts 'Please proceed with payment on credit card....'
          exit 4
        when '2'
          exit 4
        else
          system 'clear'
          puts "Invalid choice: #{choice}"
      end
    end  ### end for loop
  end ## end for menu option 5

end  ## end for print_order

# 3 remove from order
def remove_from_order(menu_order)

  loop do
    print_order(menu_order, 'remove')

    puts "Enter menu item for removal"
    index = gets.chomp

    break if index.nil? # User wants out

    itemindex = index.to_i - 1
    # Remove item from list
    removed_item = menu_order.delete_at(itemindex)
    # User entered index that was out of bounds
    if removed_item.nil?
      puts "Invalid index #{index}, try again"
      next # Skip code ahead, restart from loop beginning
    end

    puts "Item at index #{index} removed"
    sleep 1
    print_order(menu_order, '4')
    break
  end

end


# Display menu choice
def the_main_menu
@order = Order.new
menu_order = []

  loop do
      system 'clear'
      puts 'Menu option list'
      puts ''
      puts '1. Order from menu'
      puts '2. Add to order'
      puts '3. Remove ordered items'
      puts '4. Repeat ordered items'
      puts '5. Ask for bill'
      puts 'x. Exit'

    choice = gets.chomp
    case choice
      when '1'
        system 'clear'
        food_menu(menu_order)
      when '2'
        system 'clear'
        food_menu(menu_order)
      when '3'
        system 'clear'
        remove_from_order(menu_order)
      when '4'
        system 'clear'
        print_order(menu_order, choice)
      when '5'
        system 'clear'
        print_order(menu_order, choice)
      when 'x'
         break
      else
        system 'clear'
        puts "Invalid choice: #{choice}"
    end

    sleep 2

  end

end  # end of the_main_menu


###start of program

the_main_menu


puts 'Thank you'
puts 'Please come again!!'
puts ''
