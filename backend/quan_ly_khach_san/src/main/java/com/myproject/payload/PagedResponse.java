package com.myproject.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse {

	private int currentPage;
	private int sizePage;
	private String sortField;
	private String sortDir;
	private String keyword;
	private int totolPage;
	private long totalElement;
	
}
