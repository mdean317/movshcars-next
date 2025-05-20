type DropboxProps = {

    data?: string[];
    classes?: string;
    

};

export default function Dropbox({ data = [''], classes = '' }: DropboxProps) {

    return (<><h2>{data}</h2><h2>{classes}</h2></>) /*
        <div class="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
<div class="flex items-center justify-center p-12">
  <div class=" relative inline-block text-left dropdown">
    <span class="rounded-md shadow-sm"
      ><button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" 
       type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
        <span>Options</span>
        <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </span>
    <div class="hidden dropdown-menu">
      <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
        <div class="px-4 py-3">
            {condition ?  
                <p class="text-sm leading-5">Signed in as</p>
                <p class="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
            :
            <></>
            }
        </div>
        <div class="py-1">
          <a onClick={} class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Account settings</a>
          <a onClick={} class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Support</a>
          <span role="menuitem" tabindex="-1" class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50" aria-disabled="true">New feature (soon)</span>
          <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >License</a></div>
        <div class="py-1">
          <a href="javascript:void(0)" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Sign out</a></div>
      </div>
    </div>
  </div>
</div>              
</div>  

        <label className="dropdownLabel" htmlFor="category">Pick a category:</label>
                                <select className="dropdown" name="category" id="category" required value={category.category_id} onChange={handleCategoryChange}>
                                    {allCategories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.name}
                                    </option>
                                ))}
                                </select> */
}
