using System;

namespace Application.Common.Dtos;

public record PagedListDto<T>
{
    /// <summary>
    /// Page index
    /// </summary>
    public int PageIndex { get; set; }

    /// <summary>
    /// Page size
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total count
    /// </summary>
    public int TotalCount { get; set; }

    /// <summary>
    /// Total pages
    /// </summary>
    public int TotalPages { get; set; }

    /// <summary>
    /// Has previous page
    /// </summary>
    public bool HasPreviousPage { get; set; }

    /// <summary>
    /// Has next page
    /// </summary>
    public bool HasNextPage { get; set; }

    /// <summary>
    /// List of items
    /// </summary>
    public IEnumerable<T> Items { get; set; }
}
